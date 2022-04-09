export interface GameData {
  question: string
  all_words: string[];
  good_words: string[];
};

export interface Word {
  word: string;
  color: string;
  selection: Selection
}

export interface SummaryScore {
  right: number;
  missed: number;
  wrong: number;
}

export enum Selection {
  Neutral,
  Wrong,
  Correct
}