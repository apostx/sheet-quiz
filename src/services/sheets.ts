import type { QuizQuestion, QuizOption, QuizTopic } from '../types/quiz';

export class SheetsService {
  async fetchQuizTopic(spreadsheetId: string, sheetName: string): Promise<QuizTopic> {
    // Use CSV export URL - works for public sheets without API key
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

    const response = await fetch(url);

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
    const lines = csvText.split('\n');
    const result: string[][] = [];

    for (const line of lines) {
      if (!line.trim()) continue;

      const row: string[] = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          row.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      row.push(current);
      result.push(row);
    }

    return result;
  }

  private parseRows(rows: string[][]): QuizQuestion[] {
    return rows.map(row => this.parseRow(row)).filter((q): q is QuizQuestion => q !== null);
  }

  private parseRow(row: string[]): QuizQuestion | null {
    if (row.length < 4) {
      return null; // Need at least question + note + one option pair
    }

    const question = row[0]?.trim();
    const note = row[1]?.trim();

    if (!question) {
      return null; // Skip rows without a question
    }

    const options: QuizOption[] = [];

    // Parse option pairs starting from column 3 (index 2)
    for (let i = 2; i < row.length; i += 2) {
      const response = row[i]?.trim();
      const hint = row[i + 1]?.trim() || '';

      if (response) {
        options.push({ response, hint });
      }
    }

    if (options.length === 0) {
      return null; // Skip questions without options
    }

    return {
      question,
      note: note || '',
      options,
      correctOption: options[0], // First option is always correct
    };
  }
}

export const createSheetsService = (): SheetsService => {
  return new SheetsService();
};
