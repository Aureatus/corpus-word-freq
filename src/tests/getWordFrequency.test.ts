import { corpusObject } from "..";

describe("Word Frequency Tests without any removals", () => {
  const testing = corpusObject();
  test("Freq of than", () => {
    expect(testing.getWordFrequency("than")).toBe(0);
  });
  test("Freq of facilitate", () => {
    expect(testing.getWordFrequency("facilitate")).toBe(17);
  });
  test("Freq of taken", () => {
    expect(testing.getWordFrequency("taken")).toBe(0);
  });
  test("Freq of catallaxy", () => {
    expect(testing.getWordFrequency("catallaxy")).toBe(0);
  });
});

describe("Word Frequency Tests with Conj removed", () => {
  const testing = corpusObject(["Conj"]);
  test("Freq of than", () => {
    expect(testing.getWordFrequency("than")).toBe(0);
  });
  test("Freq of facilitate", () => {
    expect(testing.getWordFrequency("facilitate")).toBe(17);
  });
  test("Freq of taken", () => {
    expect(testing.getWordFrequency("taken")).toBe(0);
  });
  test("Freq of catallaxy", () => {
    expect(testing.getWordFrequency("catallaxy")).toBe(0);
  });
});
