import { readFileSync } from 'fs';

import { unzipSync } from 'zlib';

import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';
import { replacePosTags } from './utils';

export type patternOfSpeech =
  | 'Uncl'
  | 'DetP'
  | 'Fore'
  | 'NoP'
  | 'Adj'
  | 'Det'
  | 'Inf'
  | 'Lett'
  | 'NoC'
  | 'Prep'
  | 'Pron'
  | 'Int'
  | 'Verb'
  | 'Adv'
  | 'Conj'
  | 'Form'
  | 'Num'
  | 'VMod'
  | 'Ex'
  | 'ClO'
  | 'Neg'
  | 'Gen';

export type WordObject = {
  word: string;
  freq: string;
  PoS: patternOfSpeech;
  disp: string;
};

const corpusObject = (posToRemove: patternOfSpeech[] | null = null) => {
  const nlp = winkNLP(model, ['sbd', 'pos']);

  const compressedWordFreqList = readFileSync(
    `${__dirname}/wordFreqList.json.gz`
  );
  let wordFreqList: WordObject[] = JSON.parse(
    unzipSync(compressedWordFreqList).toString()
  );

  wordFreqList = wordFreqList.filter(
    (wordObject: WordObject) => !posToRemove?.includes(wordObject.PoS)
  );

  const getWordFrequency = (word: string) => {
    const doc = nlp.readDoc(word);
    const lemmatisedWord = doc.out(nlp.its.lemma);

    const wordObject = wordFreqList.find(e => e.word === lemmatisedWord);

    if (wordObject === undefined) return null;

    const wordFreq = wordObject.freq;
    const wordFreqNumber = Number(wordFreq);
    if (isNaN(wordFreqNumber)) return null;

    return wordFreqNumber;
  };

  const getMatchedWords = (
    wordList: string[],
    desiredMatches: number,
    common = false,
    factorPos = true
  ) => {
    const freqList = common ? [...wordFreqList].reverse() : wordFreqList;
    const lowerCasedWordList = wordList.map(e => e.toLowerCase());
    const matchedWords: WordObject[] = [];

    const doc = nlp.readDoc(lowerCasedWordList.join(' '));
    const lemmatisedWordList = doc.tokens().out(nlp.its.lemma);

    if (!factorPos) {
      for (const wordObject of freqList) {
        if (matchedWords.length === desiredMatches) break;
        const isWordDuplicate = matchedWords.some(
          matchedWordObject => wordObject.word === matchedWordObject.word
        );

        if (isWordDuplicate) continue;

        const matchedWordObject = lemmatisedWordList.find(
          word => word === wordObject.word
        );
        if (matchedWordObject) matchedWords.push(wordObject);
      }
    } else {
      const tokenPartOfSpeechList = doc.tokens().out(nlp.its.pos);
      const wordListWithPos = lemmatisedWordList.map((e, index) => {
        return { word: e, pos: tokenPartOfSpeechList[index] };
      });

      const wordListWithReplacedPos = replacePosTags(wordListWithPos);

      for (const wordObject of freqList) {
        if (matchedWords.length === desiredMatches) break;
        const isWordDuplicate = matchedWords.some(
          matchedWordObject =>
            wordObject.word === matchedWordObject.word &&
            wordObject.PoS === matchedWordObject.PoS
        );

        if (isWordDuplicate) continue;

        const matchedWordObject = wordListWithReplacedPos.find(
          word => word.word === wordObject.word && word.pos === wordObject.PoS
        );
        if (matchedWordObject) matchedWords.push(wordObject);
      }
    }

    if (matchedWords.length < desiredMatches)
      throw Error("Couldn't find desired amount of matches");
    return matchedWords;
  };

  return { getWordFrequency, getMatchedWords };
};

export { corpusObject };
