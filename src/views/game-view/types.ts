export interface GameData {
  question: string
  all_words: string[];
  good_words: string[];
};

export interface Word {
  word: string;
  color: string;
}

export interface SummaryScore {
  right: number;
  missed: number;
  wrong: number;
}
