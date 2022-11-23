import { readFileSync } from "fs";

interface WordObject {
  word: string;
  freq: string;
  PoS: string;
}

const wordFreqList: WordObject[] = JSON.parse(
  readFileSync(`${__dirname}/wordFreqList.txt`, "utf-8")
);

function getWordFrequency(word: string) {
  const wordObject = wordFreqList.find((e) => e.word === word);
  const wordFreq = wordObject?.freq;
  const wordFreqNumber = Number(wordFreq);
  return wordFreqNumber || undefined;
}

export { getWordFrequency };
