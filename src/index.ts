import { readFileSync } from "fs";

const wordFreqList = JSON.parse(
  readFileSync(`${__dirname}/wordFreqList.txt`, "utf-8")
);
