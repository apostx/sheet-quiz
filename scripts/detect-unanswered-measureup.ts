import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUESTIONS_DIR = path.join(__dirname, '../questions');

const ANSWER_KEY = '/https:\\/\\/launcher\\.measureup\\.com\\/v1\\/questions\\/.*\\/answer/i';

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

interface UnansweredQuestion {
  index: number;
  id: string;
  type: string;
  questionPreview: string;
  choiceCount: number;
}

function analyzeMeasureUpFile(filePath: string): void {
  const filename = path.basename(filePath);
  console.log(`\nAnalyzing: ${filename}`);
  console.log('='.repeat(60));

  const jsonContent = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonContent);

  const launchData = data?.['https://viewer.measureup.com/test/launch'];
  if (!Array.isArray(launchData) || launchData.length === 0) {
    console.error('  Not a valid MeasureUp file');
    return;
  }

  const componentData = launchData[0]?.props?.componentData;
  const questionsContent = componentData?.test?.questionsContent || [];

  // Build answer map from the answer endpoint data
  const answerResponses: Record<string, unknown>[] = data?.[ANSWER_KEY] || [];
  const answerMap = new Map<string, Record<string, unknown>>();
  for (const resp of answerResponses) {
    const answer = resp?.answer as Record<string, unknown> | undefined;
    if (answer?.questionName) {
      answerMap.set(answer.questionName as string, answer);
    }
  }

  const unanswered: UnansweredQuestion[] = [];
  let totalQuestions = 0;
  let answeredCount = 0;

  for (let i = 0; i < questionsContent.length; i++) {
    const item = questionsContent[i];
    const content = item.content;

    totalQuestions++;

    const answerData = answerMap.get(item.id);
    const correctChoiceIds = (answerData?.selectedChoiceIds as string[] | undefined) || [];

    if (correctChoiceIds.length > 0) {
      answeredCount++;
    } else {
      unanswered.push({
        index: i + 1,
        id: item.id,
        type: content?.concreteType || 'unknown',
        questionPreview: stripHtml(content?.stem || '').slice(0, 100),
        choiceCount: (content?.choices || []).length
      });
    }
  }

  console.log(`Total questions: ${totalQuestions}`);
  console.log(`Answered: ${answeredCount}`);
  console.log(`Unanswered: ${unanswered.length}`);

  if (unanswered.length > 0) {
    console.log(`\nUnanswered questions:`);
    for (const q of unanswered) {
      console.log(`  #${q.index} [${q.type}] (${q.choiceCount} choices) ${q.questionPreview}...`);
    }
  } else {
    console.log('\nAll questions have answers defined.');
  }
}

// ============ MAIN ============

function main(): void {
  console.log('Detecting unanswered MeasureUp questions...');

  if (!fs.existsSync(QUESTIONS_DIR)) {
    console.error(`Questions directory not found: ${QUESTIONS_DIR}`);
    process.exit(1);
  }

  let filesFound = 0;

  function walk(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && /^measureup_(quiz|test)_\d+\.json$/i.test(entry.name)) {
        filesFound++;
        analyzeMeasureUpFile(fullPath);
      }
    }
  }

  walk(QUESTIONS_DIR);

  if (filesFound === 0) {
    console.log('\nNo MeasureUp JSON files found.');
  }
}

main();
