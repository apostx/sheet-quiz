import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createSheetsService } from '../services';
import { localSheetName, localSpreadsheetId, savePack } from '../services/localPacks';
import { PROTOCOL_VERSION, readExportMessage, type ReplyMessage } from '../services/receive';

/** How long to wait for the quiz after saying the page is ready. */
const WAIT_MS = 30_000;

/**
 * /receive: takes a quiz from the app that opened this tab (see services/receive.ts), keeps it in
 * this browser and starts it. The quiz is then listed on the home page like a spreadsheet.
 */
export const ReceivePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(() =>
    window.opener ? null : 'This page receives a quiz from another app, such as DomainMap. Open it from there.'
  );

  useEffect(() => {
    const opener = window.opener as Window | null;
    if (!opener) return;

    let done = false;
    const onMessage = (event: MessageEvent) => {
      if (done || event.source !== opener) return;
      const message = readExportMessage(event.data);
      if (message === null) return;
      done = true;
      const reply = (body: ReplyMessage) => opener.postMessage(body, event.origin);

      if ('reason' in message) {
        reply({ type: 'domain-map:failed', version: PROTOCOL_VERSION, reason: message.reason });
        setError(message.reason);
        return;
      }
      const spreadsheetId = localSpreadsheetId(message.dataset.id);
      const sheetName = localSheetName(message.title);
      const topic = createSheetsService().parseQuizTopic(message.csv, sheetName, { sanitize: true });
      if (topic.questions.length === 0) {
        const reason = 'The export holds no question this app can read.';
        reply({ type: 'domain-map:failed', version: PROTOCOL_VERSION, reason });
        setError(reason);
        return;
      }
      const saved = savePack({
        spreadsheetId,
        sheetName,
        datasetName: message.dataset.name,
        csv: message.csv,
        receivedAt: new Date().toISOString(),
      });
      if (!saved) {
        const reason = 'The browser has no room left for the quiz; delete some saved quizzes first.';
        reply({ type: 'domain-map:failed', version: PROTOCOL_VERSION, reason });
        setError(reason);
        return;
      }
      reply({ type: 'domain-map:received', version: PROTOCOL_VERSION });
      navigate(`/${spreadsheetId}/${encodeURIComponent(sheetName)}`, { replace: true });
    };

    window.addEventListener('message', onMessage);
    // The opener may be on any site, and this message says only that the page is ready.
    opener.postMessage({ type: 'domain-map:ready', version: PROTOCOL_VERSION } satisfies ReplyMessage, '*');
    const timer = window.setTimeout(() => {
      if (!done) setError('No quiz arrived from the app that opened this page. Try again from there.');
    }, WAIT_MS);

    return () => {
      window.removeEventListener('message', onMessage);
      window.clearTimeout(timer);
    };
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
          <Link to="/" className="block text-center text-blue-600 hover:underline">
            ← Back to Spreadsheets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Receiving quiz...</div>
    </div>
  );
};
