import { getWordFrequency } from "..";

describe("Word Frequency Tests", () => {
  test("Freq of than", () => {
    expect(getWordFrequency("than")).toBe(1033);
  });
  test("Freq of facilitate", () => {
    expect(getWordFrequency("facilitate")).toBe(10);
  });
  test("Freq of taken", () => {
    expect(getWordFrequency("taken")).toBe(355);
  });
  test("Freq of catallaxy", () => {
    expect(getWordFrequency("catallaxy")).toBe(undefined);
  });
});
