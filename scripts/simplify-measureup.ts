import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ANSWER_KEY = '/https:\\/\\/launcher\\.measureup\\.com\\/v1\\/questions\\/.*\\/answer/i';

function simplify(inputPath: string, outputPath: string): void {
  const data = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

  const launchData = data['https://viewer.measureup.com/test/launch'][0];
  const questionsContent = launchData.props.componentData.test.questionsContent;
  const answers = data[ANSWER_KEY];

  const minQuestions = questionsContent.map((q: any) => ({
    id: q.id,
    content: {
      concreteType: q.content.concreteType,
      stem: q.content.stem,
      choices: q.content.choices.map((c: any) => ({
        id: c.id,
        text: c.text,
        explanation: ''
      }))
    }
  }));

  const minAnswers = answers.map((a: any) => ({
    answer: {
      questionName: a.answer.questionName,
      selectedChoiceIds: a.answer.selectedChoiceIds,
      explanation: a.answer.explanation
    }
  }));

  const result = {
    'https://viewer.measureup.com/test/launch': [{
      props: {
        componentData: {
          test: {
            questionsContent: minQuestions
          }
        }
      }
    }],
    [ANSWER_KEY]: minAnswers
  };

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

  const inputSize = (fs.statSync(inputPath).size / 1024).toFixed(1);
  const outputSize = (fs.statSync(outputPath).size / 1024).toFixed(1);
  console.log(`Input:  ${inputSize} KB`);
  console.log(`Output: ${outputSize} KB`);
  console.log(`Questions: ${minQuestions.length}, Answers: ${minAnswers.length}`);
}

const questionsDir = path.join(__dirname, '../questions/aws_certified_developer');
simplify(
  path.join(questionsDir, 'measureup_test_01.json'),
  path.join(questionsDir, 'measureup_test_02.json')
);
