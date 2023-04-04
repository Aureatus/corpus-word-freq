import { corpusObject } from '../index';
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

  test('Returned amount of words is correct', () => {
    expect(corpus.getMatchedWords(BeautifulCreatures, 20)).toHaveLength(20);
  });

  test('Throws error if not enough words can be found', () => {
    expect(() => corpus.getMatchedWords(['than'], 4)).toThrow(
      "Couldn't find desired amount of matches"
    );
  });

  test("Doesn't return duplicates", () => {
    expect(() => corpus.getMatchedWords(['than', 'than'], 2)).toThrow(
      "Couldn't find desired amount of matches"
    );
  });
});
