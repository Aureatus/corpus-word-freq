import { corpusObject } from '../src/index';

describe('Word Frequencies', () => {
  const corpus = corpusObject();

  test('Freq of than is correct', () => {
    expect(corpus.getWordFrequency('than')).toBe(0);
  });
  test('Freq of facilitate is correct', () => {
    expect(corpus.getWordFrequency('facilitate')).toBe(17);
  });
  test('Freq of taken is correct', () => {
    expect(corpus.getWordFrequency('taken')).toBe(0);
  });
  test('Freq of catallaxy is correct', () => {
    expect(corpus.getWordFrequency('catallaxy')).toBe(0);
  });
});
