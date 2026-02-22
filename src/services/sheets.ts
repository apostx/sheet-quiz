import type { QuizQuestion, QuizOption, QuizTopic } from '../types/quiz';

export class SheetsService {
  async fetchQuizTopic(spreadsheetId: string, sheetName: string, signal?: AbortSignal): Promise<QuizTopic> {
    // Use CSV export URL - works for public sheets without API key
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}&headers=0`;

    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data (${response.status}): ${response.statusText}`);
    }

    const csvText = await response.text();
    const rows = this.parseCSV(csvText);

    const questions = this.parseRows(rows);

    return {
      name: sheetName,
      questions,
    };
  }

  private parseCSV(csvText: string): string[][] {
    const result: string[][] = [];
    let i = 0;
    const n = csvText.length;

    while (i < n) {
      const row: string[] = [];

      // Parse all cells in this row
      while (i < n) {
        let cell = '';

        if (csvText[i] === '"') {
          // Quoted field — may contain embedded commas and newlines
          i++; // skip opening quote
          while (i < n) {
            if (csvText[i] === '"') {
              if (i + 1 < n && csvText[i + 1] === '"') {
                cell += '"'; i += 2; // escaped quote ""
              } else {
                i++; break; // closing quote
              }
            } else {
              cell += csvText[i++];
            }
          }
        } else {
          // Unquoted field — stop at comma or line terminator
          while (i < n && csvText[i] !== ',' && csvText[i] !== '\n' && csvText[i] !== '\r') {
            cell += csvText[i++];
          }
        }

        row.push(cell);

        if (i < n && csvText[i] === ',') {
          i++; // advance past comma, continue to next cell
        } else {
          break; // end of row
        }
      }

      // Skip row terminator (\r\n or \n)
      if (i < n && csvText[i] === '\r') i++;
      if (i < n && csvText[i] === '\n') i++;

      // Remove trailing empty cells and add non-empty rows
      while (row.length > 0 && row[row.length - 1] === '') row.pop();
      if (row.length > 0) result.push(row);
    }

    return result;
  }

  private parseRows(rows: string[][]): QuizQuestion[] {
    return rows.map(row => this.parseRow(row)).filter((q): q is QuizQuestion => q !== null);
  }

  private parseCorrectIndices(
    indicesStr: string | undefined,
    options: QuizOption[]
  ): { correctOptions: QuizOption[]; isMultiAnswer: boolean } {
    // Default to "1" if empty (backward compatibility)
    if (!indicesStr || indicesStr.trim() === '') {
      return { correctOptions: [options[0]], isMultiAnswer: false };
    }

    // Check for bracket syntax: [1,2,3]
    const trimmed = indicesStr.trim();
    const isMultiAnswer = trimmed.startsWith('[') && trimmed.endsWith(']');

    // Strip brackets if present
    const indicesOnly = isMultiAnswer
      ? trimmed.slice(1, -1)  // Remove [ and ]
      : trimmed;

    // Parse: "1,2,3" → [0,1,2] (convert 1-based to 0-based)
    const parsed = indicesOnly
      .split(',')
      .map(s => s.trim())
      .map(s => parseInt(s, 10))
      .filter(n => !isNaN(n));

    // Warn about out-of-bounds indices
    const outOfBounds = parsed.filter(n => n < 1 || n > options.length);
    if (outOfBounds.length > 0) {
      console.warn(`Invalid answer indices [${outOfBounds.join(', ')}] - must be between 1 and ${options.length}`);
    }

    const indices = parsed
      .filter(n => n >= 1 && n <= options.length)
      .map(n => n - 1);

    // Fallback to first option if parsing failed
    if (indices.length === 0) {
      return { correctOptions: [options[0]], isMultiAnswer: false };
    }

    return {
      correctOptions: indices.map(i => options[i]),
      isMultiAnswer
    };
  }

  private parseRow(row: string[]): QuizQuestion | null {
    if (row.length < 5) {
      return null; // Need at least question + note + correctIndices + one option pair
    }

    const question = row[0]?.trim();
    const note = row[1]?.trim();
    const correctIndicesRaw = row[2]?.trim();

    if (!question) {
      return null; // Skip rows without a question
    }

    const options: QuizOption[] = [];

    // Parse option pairs starting from column 3 (index 3)
    for (let i = 3; i < row.length; i += 2) {
      const response = row[i]?.trim();
      const hint = row[i + 1]?.trim() || '';

      if (response) {
        options.push({ response, hint });
      }
    }

    if (options.length === 0) {
      return null; // Skip questions without options
    }

    const { correctOptions, isMultiAnswer } = this.parseCorrectIndices(correctIndicesRaw, options);

    return {
      question,
      note: note || '',
      options,
      correctOptions,
      isMultiAnswer,
    };
  }
}

export const createSheetsService = (): SheetsService => {
  return new SheetsService();
};
