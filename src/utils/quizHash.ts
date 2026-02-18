export interface QuizHashState {
  seed: number;
  currentQuestionIndex: number;
  answers: Map<number, Set<number>>; // questionIndex → Set<optionIndex>
  currentSelections: Set<number>; // option indices for current (unsubmitted) question
  showResult: boolean;
}

export const encodeQuizHash = (state: QuizHashState): string => {
  const parts: string[] = [`s=${state.seed}`];

  if (state.currentQuestionIndex > 0) {
    parts.push(`q=${state.currentQuestionIndex}`);
  }

  if (state.answers.size > 0) {
    const answerParts: string[] = [];
    for (const [qIdx, optIndices] of state.answers) {
      answerParts.push(`${qIdx}:${[...optIndices].join('.')}`);
    }
    parts.push(`a=${answerParts.join(',')}`);
  }

  if (state.currentSelections.size > 0) {
    parts.push(`c=${[...state.currentSelections].join('.')}`);
  }

  if (state.showResult) {
    parts.push('r=1');
  }

  return `#${parts.join('&')}`;
};

export const parseQuizHash = (hash: string): QuizHashState | null => {
  if (!hash || !hash.startsWith('#')) return null;

  const params = new URLSearchParams(hash.slice(1));
  const seedStr = params.get('s');
  if (!seedStr) return null;

  const seed = parseInt(seedStr, 10);
  if (isNaN(seed)) return null;

  const currentQuestionIndex = parseInt(params.get('q') || '0', 10) || 0;

  const answers = new Map<number, Set<number>>();
  const answersStr = params.get('a');
  if (answersStr) {
    for (const entry of answersStr.split(',')) {
      const [qIdxStr, optStr] = entry.split(':');
      const qIdx = parseInt(qIdxStr, 10);
      if (isNaN(qIdx) || !optStr) continue;
      const optIndices = new Set(optStr.split('.').map(Number).filter(n => !isNaN(n)));
      if (optIndices.size > 0) {
        answers.set(qIdx, optIndices);
      }
    }
  }

  const currentSelections = new Set<number>();
  const selectionsStr = params.get('c');
  if (selectionsStr) {
    for (const s of selectionsStr.split('.')) {
      const n = parseInt(s, 10);
      if (!isNaN(n)) currentSelections.add(n);
    }
  }

  const showResult = params.get('r') === '1';

  return { seed, currentQuestionIndex, answers, currentSelections, showResult };
};
