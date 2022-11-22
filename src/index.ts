import { readFileSync } from "fs";

interface WordObject {
  word: string;
  freq: string;
  PoS: string;
}

const wordFreqList: WordObject[] = JSON.parse(
  readFileSync(`${__dirname}/wordFreqList.txt`, "utf-8")
);
