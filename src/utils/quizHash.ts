export interface QuizHashState {
  seed: number;
  answers: Map<number, Set<number>>; // questionIndex → Set<optionIndex>
}

export const encodeQuizHash = (state: QuizHashState): string => {
  const parts: string[] = [`s=${state.seed}`];

  if (state.answers.size > 0) {
    const answerParts: string[] = [];
    for (const [qIdx, optIndices] of state.answers) {
      answerParts.push(`${qIdx}:${[...optIndices].join('.')}`);
    }
    parts.push(`a=${answerParts.join(',')}`);
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

  return { seed, answers };
};
