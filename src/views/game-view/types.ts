import { PositionProps } from "@chakra-ui/react";

export interface GameData {
  question: string
  all_words: string[];
  good_words: string[];
};

export interface Word {
  word: string;
  color: string;
  position: Position
}

export interface Position {
  left: PositionProps["left"];
  top: PositionProps["top"];
}
