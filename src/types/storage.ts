export interface StoredSpreadsheet {
  id: string;
  order: number;
}

export interface StoredSheet {
  spreadsheetId: string;
  name: string;
  order: number;
}

export const STORAGE_KEYS = {
  SPREADSHEETS: 'sheet-quiz:spreadsheets',
  SHEETS: 'sheet-quiz:sheets',
} as const;
