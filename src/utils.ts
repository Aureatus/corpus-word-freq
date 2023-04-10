import { nlpWordObject } from '.';

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
