import { describe, it, expect } from 'vitest';
import { shuffleArray } from './shuffle';

describe('shuffleArray', () => {
  it('returns an array with the same length', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result).toHaveLength(input.length);
  });

  it('returns an array with the same elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result.sort()).toEqual(input.sort());
  });

  it('does not mutate the original array', () => {
    const input = [1, 2, 3, 4, 5];
    const original = [...input];
    shuffleArray(input);
    expect(input).toEqual(original);
  });

  it('preserves object references', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const input = [obj1, obj2];
    const result = shuffleArray(input);
    expect(result).toContain(obj1);
    expect(result).toContain(obj2);
  });

  it('handles empty array', () => {
    expect(shuffleArray([])).toEqual([]);
  });

  it('handles single element array', () => {
    expect(shuffleArray([1])).toEqual([1]);
  });
});
