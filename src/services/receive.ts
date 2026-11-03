/**
 * The receiving side of the DomainMap export protocol (version 1), by which another app hands a
 * quiz to this one without a file or a spreadsheet:
 *
 * 1. The sender opens this app's /receive page in a new tab, as its opener.
 * 2. The page tells the opener it is ready: `{ type: 'domain-map:ready', version: 1 }`.
 * 3. The opener answers with the export:
 *    `{ type: 'domain-map:export', version: 1, format, dataset: { id, name }, title, csv }`,
 *    where `csv` is the same sheet the sender would download, in this app's sheet format.
 * 4. The page stores it and answers `{ type: 'domain-map:received', version: 1 }`, or
 *    `{ type: 'domain-map:failed', version: 1, reason }` with a sentence for the sender to show.
 */

export const PROTOCOL_VERSION = 1;

/** The export format this app reads. */
export const ACCEPTED_FORMAT = 'quiz';

/** Larger exports are refused: localStorage holds about 5 MB per site. */
export const MAX_CSV_LENGTH = 4_000_000;

export interface ExportMessage {
  type: 'domain-map:export';
  version: number;
  format: string;
  dataset: { id: string; name: string };
  title: string;
  csv: string;
}

export type ReplyMessage =
  | { type: 'domain-map:ready'; version: number }
  | { type: 'domain-map:received'; version: number }
  | { type: 'domain-map:failed'; version: number; reason: string };

const isText = (value: unknown, max: number): value is string =>
  typeof value === 'string' && value.trim() !== '' && value.length <= max;

/**
 * The export in a message, or null when the message is something else. A message of the
 * protocol that cannot be read gives a reason instead.
 */
export function readExportMessage(data: unknown): ExportMessage | { reason: string } | null {
  if (typeof data !== 'object' || data === null) return null;
  const message = data as Record<string, unknown>;
  if (message.type !== 'domain-map:export') return null;
  if (message.version !== PROTOCOL_VERSION)
    return { reason: `This app reads version ${PROTOCOL_VERSION} of the export.` };
  const dataset = message.dataset as Record<string, unknown> | null | undefined;
  if (
    typeof message.format !== 'string' ||
    typeof dataset !== 'object' ||
    dataset === null ||
    !isText(dataset.id, 200) ||
    !isText(dataset.name, 200) ||
    !isText(message.title, 200) ||
    typeof message.csv !== 'string'
  )
    return { reason: 'The export is incomplete.' };
  if (message.format !== ACCEPTED_FORMAT)
    return { reason: `This app reads quizzes, not ${message.format}.` };
  if (message.csv.length > MAX_CSV_LENGTH)
    return { reason: 'The quiz is too large to keep in this browser.' };
  return {
    type: 'domain-map:export',
    version: message.version,
    format: message.format,
    dataset: { id: dataset.id, name: dataset.name },
    title: message.title,
    csv: message.csv,
  };
}
