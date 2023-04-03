import { readFileSync } from 'fs';

import { unzipSync } from 'zlib';

interface WordObject {
  word: string;
  freq: string;
  PoS: string;
}

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
    const wordFreq = wordObject?.freq;
    const wordFreqNumber = Number(wordFreq);
    return typeof wordFreqNumber === 'number' ? wordFreqNumber : undefined;
  };

  const getMatchedWords = (wordList: string[], desiredMatches: number) => {
    const matchedWords: WordObject[] = [];

    for (const [index] of wordList.entries()) {
      if (matchedWords.length === desiredMatches) break;
      const isWordDuplicate = matchedWords.some(
        wordObject => wordFreqList[index].word === wordObject.word
      );

      if (isWordDuplicate) continue;

      const matchedWordObject = wordList.find(
        word => word === wordFreqList[index].word
      );
      if (matchedWordObject) matchedWords.push(wordFreqList[index]);
    }
    if (matchedWords.length < desiredMatches)
      throw Error("Couldn't find desired amount of matches");
    return matchedWords;
  };

  return { getWordFrequency, getMatchedWords };
};

export { corpusObject };
