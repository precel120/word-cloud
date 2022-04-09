import * as React from "react";
import { Heading, Center, Stack, Box, Button, Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GameData, Word, Selection } from "./types";
import { setScore } from "../../redux/slice";
import "./game.scss";

const GameView = () => {
  const [question, setQuestion] = React.useState<string>();
  const [goodWords, setGoodWords] = React.useState<string[]>([]);
  const [allWords, setAllWords] = React.useState<Word[]>([]);
  const [selectedWords, setSelectedWords] = React.useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);

  const dispatch = useDispatch();

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  React.useEffect(() => {
    (async function () {
      const randomValue = getRandomInt(0, 10) % 3;
      let data;
      if (randomValue === 0) {
        data = await fetch("./animals.json");
      } else if (randomValue === 1) {
        data = await fetch("./colors.json");
      } else {
        data = await fetch("./vehicles.json");
      }
      const { question, good_words, all_words }: GameData = await data.json();
      setQuestion(question);
      setGoodWords(good_words);

      let tempWords: Word[] = [];

      all_words.forEach((word) => {
        tempWords.push({
          word,
          color: "black",
          selection: Selection.Neutral,
        });
      });
      setAllWords(tempWords);
    })();
  }, []);

  const handleWordClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    if (isSubmitted) {
      return;
    }
    const input = e.target as HTMLElement;
    const selectedValue = input.innerText;
    const wasInSelectedWords: boolean = !!selectedWords.find(
      (word) => word === selectedValue
    );
    const foundWord = allWords.find((word) => word.word === selectedValue);
    if (!foundWord) {
      return;
    }
    setSelectedWords(
      wasInSelectedWords
        ? selectedWords.filter((word) => word !== selectedValue)
        : [selectedValue, ...selectedWords]
    );
    allWords[allWords.indexOf(foundWord)].color = wasInSelectedWords
      ? "black"
      : "grey";
  };

  const handleSubmit = () => {
    selectedWords.forEach((selected) => {
      const foundWord = allWords.find(({ word }) => word === selected);
      if (!foundWord) {
        return;
      }
      const index = allWords.indexOf(foundWord);
      if (goodWords.find((good) => good === selected)) {
        allWords[index] = {
          ...allWords[index],
          color: "rgb(0, 230, 0)",
          selection: Selection.Correct,
        };
      } else {
        allWords[index] = {
          ...allWords[index],
          color: "red",
          selection: Selection.Wrong,
        };
      }
    });
    setIsSubmitted(true);
  };

  const handleFinishGame = () => {
    const correctAnswers = goodWords.filter((word) =>
      selectedWords.includes(word)
    ).length;
    const missedAnswers = goodWords.filter(
      (word) => !selectedWords.includes(word)
    ).length;
    const wrongAnswers = selectedWords.filter(
      (word) => !goodWords.includes(word)
    ).length;
    dispatch(
      setScore({
        right: correctAnswers,
        missed: missedAnswers,
        wrong: wrongAnswers,
      })
    );
    setIsFinished(true);
  };

  return (
    <Center className="center">
      <Stack>
        <Heading textAlign="center">{question}</Heading>
        <Box className="wrapper">
          {allWords.map(({ word, color, selection }) => (
            <Box
              key={word}
              className="overlay"
              color={color}
              onClick={handleWordClick}
            >
              {(() => {
                if (selection === Selection.Correct) {
                  return <Text color={color}>Good</Text>;
                } else if (selection === Selection.Wrong) {
                  return <Text color={color}>Bad</Text>;
                } else {
                  return null;
                }
              })()}
              {word}
            </Box>
          ))}
        </Box>
        {!isSubmitted ? (
          <Button onClick={handleSubmit} isDisabled={selectedWords.length <= 0}>
            Check answers
          </Button>
        ) : (
          <Button onClick={handleFinishGame}>Finish game</Button>
        )}
      </Stack>
      {isFinished && <Navigate to="/summary" />}
    </Center>
  );
};

export default GameView;
