export interface QuizParams {
  spreadsheetId: string;
  sheet: string;
  max?: number;
}

export const getQuizParams = (): QuizParams | null => {
  const params = new URLSearchParams(window.location.search);
  const spreadsheetId = params.get('spreadsheetId');
  const sheet = params.get('sheet');
  const maxParam = params.get('max');

  if (!spreadsheetId || !sheet) {
    return null;
  }

  const max = maxParam ? parseInt(maxParam, 10) : undefined;

  return {
    spreadsheetId,
    sheet,
    max: max && !isNaN(max) && max > 0 ? max : undefined,
  };
};
