import { safeGetItem, safeSetItem } from '../utils/storage';
import { STORAGE_KEYS, type StoredPack } from '../types/storage';

/**
 * Quizzes received from other apps are kept in this browser and listed like spreadsheets: a
 * dataset becomes a "spreadsheet" whose ID starts with this prefix, which Google Sheets IDs
 * never do, and each quiz of it becomes a "sheet". Routes, results and search work the same.
 */
export const LOCAL_PREFIX = '~';

export const isLocalSpreadsheet = (spreadsheetId: string): boolean =>
  spreadsheetId.startsWith(LOCAL_PREFIX);

/** The spreadsheet ID under which the quizzes of a dataset are listed. */
export function localSpreadsheetId(datasetId: string): string {
  const slug = datasetId
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${LOCAL_PREFIX}${slug || 'quizzes'}`;
}

/** A title as a sheet name, without the characters that would break a route. */
export function localSheetName(title: string): string {
  return title.replace(/[/\\?#%]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120) || 'Quiz';
}

const readPacks = () => safeGetItem<StoredPack[]>(STORAGE_KEYS.PACKS, []);

export function findPack(spreadsheetId: string, sheetName: string): StoredPack | undefined {
  return readPacks().find((pack) => pack.spreadsheetId === spreadsheetId && pack.sheetName === sheetName);
}

/** Saves a quiz, replacing one of the same dataset and title; false when storage is full. */
export function savePack(pack: StoredPack): boolean {
  const others = readPacks().filter(
    (stored) => !(stored.spreadsheetId === pack.spreadsheetId && stored.sheetName === pack.sheetName)
  );
  return safeSetItem(STORAGE_KEYS.PACKS, [...others, pack]);
}

export function removePack(spreadsheetId: string, sheetName: string): void {
  const packs = readPacks();
  const kept = packs.filter((pack) => !(pack.spreadsheetId === spreadsheetId && pack.sheetName === sheetName));
  if (kept.length !== packs.length) safeSetItem(STORAGE_KEYS.PACKS, kept);
}

export function removeLocalSpreadsheet(spreadsheetId: string): void {
  const packs = readPacks();
  const kept = packs.filter((pack) => pack.spreadsheetId !== spreadsheetId);
  if (kept.length !== packs.length) safeSetItem(STORAGE_KEYS.PACKS, kept);
}

/** What to show for a spreadsheet ID: the dataset's name for received quizzes. */
export function spreadsheetLabel(spreadsheetId: string): string {
  if (!isLocalSpreadsheet(spreadsheetId)) return spreadsheetId;
  return readPacks().find((pack) => pack.spreadsheetId === spreadsheetId)?.datasetName ?? spreadsheetId;
}
