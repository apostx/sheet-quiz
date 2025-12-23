export interface QuizOption {
  response: string;
  hint: string;
}

export interface QuizQuestion {
  question: string;
  note: string;
  options: QuizOption[];
  correctOption: QuizOption; // Reference to the correct answer option
}

export interface QuizTopic {
  name: string;
  questions: QuizQuestion[];
}

export interface SheetData {
  spreadsheetId: string;
  sheetName: string;
  rows: string[][];
}
