import { corpusObject } from '../src/index';
import BeautifulCreatures from './testingData/BeautifulCreatures.json';

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

describe('Matched words', () => {
  const corpus = corpusObject();

  test('Returns correct amount of rare words', () => {
    expect(
      corpus.getMatchedWords(BeautifulCreatures, { desiredMatches: 20 })
    ).toHaveLength(20);
  });

  test('Returns correct amount of common words', () => {
    expect(
      corpus.getMatchedWords(BeautifulCreatures, {
        desiredMatches: 20,
        common: true,
      })
    ).toHaveLength(20);
  });
  test('Throws error if not enough words can be found', () => {
    expect(() =>
      corpus.getMatchedWords(['than'], { desiredMatches: 4 })
    ).toThrow("Couldn't find desired amount of matches");
  });

  test("Doesn't return duplicates", () => {
    expect(() =>
      corpus.getMatchedWords(['than', 'than'], { desiredMatches: 4 })
    ).toThrow("Couldn't find desired amount of matches");
  });
});
