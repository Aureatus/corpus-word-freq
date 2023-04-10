export const replacePOSTags = (
  wordListWithPOS: {
    word: string;
    pos: string;
  }[]
) => {
  const POSObject: { [key: string]: string | undefined } = {
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

  const posIsString = (wordWithPOS: {
    word: string;
    pos: string | undefined;
  }): wordWithPOS is {
    word: string;
    pos: string;
  } => {
    return wordWithPOS.pos !== undefined;
  };

  const replacedWordList = wordListWithPOS
    .map(e => {
      return { word: e.word, pos: POSObject[e.pos] };
    })
    .filter(posIsString);
  return replacedWordList;
};
