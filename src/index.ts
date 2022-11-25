import { readFileSync } from "fs";

interface WordObject {
  word: string;
  freq: string;
  PoS: string;
}
/* 
PLAN

Initialise corpus object, with options for classifications of words to remove. NoC, NoP, Adj etc.

Corpus Object contains methods to be run on that corpus.

*/

const corpusObject = (posToRemove: string[] | null = null) => {
  let wordFreqList: WordObject[] = JSON.parse(
    readFileSync(`${__dirname}/wordFreqList.txt`, "utf-8")
  );

  wordFreqList = wordFreqList.filter(
    (wordObject: WordObject) => !posToRemove?.includes(wordObject.PoS)
  );

  const getWordFrequency = (word: string) => {
    const wordObject = wordFreqList.find((e) => e.word === word);
    const wordFreq = wordObject?.freq;
    const wordFreqNumber = Number(wordFreq);
    return typeof wordFreqNumber === "number" ? wordFreqNumber : undefined;
  };

  return { getWordFrequency };
};

export { corpusObject };
