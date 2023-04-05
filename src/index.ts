import { readFileSync } from 'fs';

import { unzipSync } from 'zlib';

export type WordObject = {
  word: string;
  freq: string;
  PoS: string;
  disp: string;
};

const corpusObject = (posToRemove: string[] | null = null) => {
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
    const wordObject = wordFreqList.find(e => e.word === word);

    if (wordObject === undefined) return null;

    const wordFreq = wordObject.freq;
    const wordFreqNumber = Number(wordFreq);

    return wordFreqNumber || null;
  };

  const getMatchedWords = (
    wordList: string[],
    desiredMatches: number,
    common = false
  ) => {
    const freqList = common ? [...wordFreqList].reverse() : wordFreqList;
    const lowerCasedWordList = wordList.map(e => e.toLowerCase());
    const matchedWords: WordObject[] = [];

    for (const wordObject of freqList) {
      if (matchedWords.length === desiredMatches) break;
      const isWordDuplicate = matchedWords.some(
        matchedWordObject => wordObject.word === matchedWordObject.word
      );

      if (isWordDuplicate) continue;

      const matchedWordObject = lowerCasedWordList.find(
        word => word === wordObject.word
      );
      if (matchedWordObject) matchedWords.push(wordObject);
    }
    if (matchedWords.length < desiredMatches)
      throw Error("Couldn't find desired amount of matches");
    return matchedWords;
  };

  return { getWordFrequency, getMatchedWords };
};

export { corpusObject };
