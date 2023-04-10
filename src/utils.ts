import { WordObject, nlpWordObject } from '.';

type postReplacementNlpWordObject = {
  word: string;
  pos: string | undefined;
};

export const replacePosTags = (wordListWithPos: nlpWordObject[]) => {
  const posObject: { [key: string]: string | undefined } = {
    ADJ: 'Adj',
    ADP: 'Prep',
    ADV: 'Adv',
    AUX: 'Verb',
    CCJONG: 'Conj',
    DET: 'Det',
    INTJ: 'Int',
    NOUN: 'NoC',
    NUM: 'Num',
    PART: 'Uncl',
    PRON: 'Pron',
    PROPN: 'Nop',
    PUNCT: 'Uncl',
    SCONJ: 'Conj',
    SYM: 'Uncl',
    VERB: 'Verb',
    X: 'Uncl',
    SPACE: 'Uncl',
  };

  const posIsString = (
    wordWithPos: postReplacementNlpWordObject
  ): wordWithPos is nlpWordObject => {
    return wordWithPos.pos !== undefined;
  };

  const replacedWordList = wordListWithPos
    .map(e => {
      return { word: e.word, pos: posObject[e.pos] };
    })
    .filter(posIsString);
  return replacedWordList;
};

export type findMatchedWordsOptions = {
  wordList: (string | nlpWordObject)[];
  desiredMatches: number;
  factorPos: boolean;
};

export const findMatchedWords = (
  freqList: WordObject[],
  { wordList, desiredMatches, factorPos = true }: findMatchedWordsOptions
) => {
  const isNlpWordObject = (e: nlpWordObject | string): e is nlpWordObject =>
    !(typeof e === 'string');

  const matchedWords: WordObject[] = [];

  if (factorPos) {
    if (!wordList.every(isNlpWordObject))
      throw Error('Not every element of array is of type nlpWordObject');
    for (const wordObject of freqList) {
      if (matchedWords.length === desiredMatches) break;
      const isWordDuplicate = matchedWords.some(
        matchedWordObject =>
          wordObject.word === matchedWordObject.word &&
          wordObject.PoS === matchedWordObject.PoS
      );

      if (isWordDuplicate) continue;

      const matchedWordObject = wordList.find(
        word => word.word === wordObject.word && word.pos === wordObject.PoS
      );
      if (matchedWordObject) matchedWords.push(wordObject);
    }
  } else {
    for (const wordObject of freqList) {
      if (matchedWords.length === desiredMatches) break;
      const isWordDuplicate = matchedWords.some(
        matchedWordObject => wordObject.word === matchedWordObject.word
      );

      if (isWordDuplicate) continue;

      const matchedWordObject = wordList.find(word => word === wordObject.word);
      if (matchedWordObject) matchedWords.push(wordObject);
    }
  }
  return matchedWords;
};
