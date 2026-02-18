import type { QuizOption } from '../types/quiz';

export const createSeededRandom = (seed: number) => {
  // mulberry32 PRNG — deterministic random from seed
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
};

export const shuffleArray = <T>(array: T[], random = Math.random): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const shuffleOptions = (options: QuizOption[], random = Math.random): QuizOption[] => {
  return shuffleArray(options, random);
};
