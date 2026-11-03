export interface StoredSpreadsheet {
  id: string;
  order: number;
}

export interface StoredSheet {
  spreadsheetId: string;
  name: string;
  order: number;
}

/** A quiz received from another app, kept in this browser (see services/localPacks.ts). */
export interface StoredPack {
  spreadsheetId: string;
  sheetName: string;
  datasetName: string;
  csv: string;
  receivedAt: string;
}

export const STORAGE_KEYS = {
  SPREADSHEETS: 'sheet-quiz:spreadsheets',
  SHEETS: 'sheet-quiz:sheets',
  PACKS: 'sheet-quiz:packs',
} as const;
