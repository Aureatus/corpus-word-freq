const fs = require("node:fs");
const readline = require("node:readline");
/* CODE FOR READING ZIP FILE using jsZip
fs.readFile("1_1_all_fullalpha.zip", (err, data) => {
   if (err) throw err;
   JSZip.loadAsync(data).then((zip) => {
     const test = "1_1_all_fullalpha.txt";
     zip
       .file(test)
       .async("string")
       .then((data) => console.log(data));
     const buffer = zip.files[test]._data.compressedContent;
   });
 }); 
*/

function parseToArrayOfObjects(line, parentArray) {
  let normalizedLine = line;
  // .replaceAll(/[:]/g, "");
  normalizedLine = normalizedLine.replaceAll(/\s+/g, " ").trim();
  if (
    normalizedLine.includes("@") ||
    normalizedLine.includes("/") ||
    normalizedLine.includes("&") ||
    normalizedLine.includes("-") ||
    normalizedLine.includes("'")
  )
    return;
  const lineArray = normalizedLine.split(" ");
  let unwantedIndex = lineArray.findIndex((element) => element === ":");
  if (unwantedIndex >= 0) lineArray.splice(unwantedIndex, 1);
  unwantedIndex = lineArray.findIndex((element) => element === "%");
  if (unwantedIndex >= 0) lineArray.splice(unwantedIndex, 1);
  const word = lineArray[0];
  const PoS = lineArray[1];
  const freq = lineArray[2];
  if (PoS === "Num") return;
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
  const wordFreqList = await processLineByLine("1_1_all_fullalpha.txt");
  wordFreqList.sort(() => Math.random() - 0.5); // Shuffle array to remove alphabetic bias
  // Rank wordList in ascending frequency
  wordFreqList.sort((a, b) => {
    const freqA = Number(a.freq);
    const freqB = Number(b.freq);
    if (freqA > freqB) return 1;
    if (freqA < freqB) return -1;
    return 0;
  });
  fs.writeFileSync(`src/wordFreqList.txt`, JSON.stringify(wordFreqList));
}

processTextAndSave();
