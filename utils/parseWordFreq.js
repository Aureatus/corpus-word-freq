const fs = require("node:fs");
const readline = require("node:readline");

function parseToArrayOfObjects(line, parentArray) {
  const normalizedLine = line.replaceAll(/\s/g, "  ").trim();
  const lineArray = normalizedLine.split("  ");
  const word = lineArray[0];
  const PoS = lineArray[1];
  const freq = lineArray[2];
  parentArray.push({ word, freq, PoS });
}

async function processLineByLine(file) {
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  const parentArray = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    parseToArrayOfObjects(line, parentArray);
  }
  return parentArray;
}

async function processTextAndSave() {
  const wordFreqList = await processLineByLine("1_2_all_freq.txt");
  fs.writeFileSync(`src/wordFreqList.json`, JSON.stringify(wordFreqList));
}

processTextAndSave();
