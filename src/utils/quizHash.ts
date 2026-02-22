export interface QuizHashState {
  seed: number;
  questionIndex: number; // currently viewed question
  answers: Map<number, Set<number>>; // questionIndex → Set<optionIndex>
}

export const encodeQuizHash = (state: QuizHashState): string => {
  const parts: string[] = [`s=${state.seed}`, `q=${state.questionIndex}`];

  if (state.answers.size > 0) {
    // Find last answered question index to avoid trailing empties
    let lastIdx = 0;
    for (const qIdx of state.answers.keys()) {
      if (qIdx > lastIdx) lastIdx = qIdx;
    }

    // Build positional array: position = question index, value = dot-separated option indices
    const answerParts: string[] = [];
    for (let i = 0; i <= lastIdx; i++) {
      const optIndices = state.answers.get(i);
      answerParts.push(optIndices ? [...optIndices].join('.') : '');
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

  const qStr = params.get('q');
  const questionIndex = Math.max(0, parseInt(qStr || '0', 10) || 0);

  const answers = new Map<number, Set<number>>();
  const answersStr = params.get('a');
  if (answersStr) {
    const entries = answersStr.split(',');
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i].trim();
      if (!entry) continue; // empty = unanswered
      const optIndices = new Set(
        entry.split('.').map(Number).filter(n => !isNaN(n) && n >= 0)
      );
      if (optIndices.size > 0) {
        answers.set(i, optIndices);
      }
    }
  }

  return { seed, questionIndex, answers };
};
