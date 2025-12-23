export interface QuizParams {
  spreadsheetId: string;
  sheet: string;
}

export const getQuizParams = (): QuizParams | null => {
  const params = new URLSearchParams(window.location.search);
  const spreadsheetId = params.get('spreadsheetId');
  const sheet = params.get('sheet');

  if (!spreadsheetId || !sheet) {
    return null;
  }

  return { spreadsheetId, sheet };
};
