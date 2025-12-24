export interface QuizOption {
  response: string;
  hint: string;
}

export interface QuizQuestion {
  question: string;
  note: string;
  options: QuizOption[];
  correctOptions: QuizOption[]; // References to the correct answer options
  isMultiAnswer: boolean; // True if brackets used in spreadsheet, false otherwise
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
