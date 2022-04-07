import * as React from "react";
import { Heading, Center, Stack, Box, Button, Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { GameData, Word } from "./types";
import { useDispatch } from "react-redux";
import { setScore } from "../../redux/slice";
import "./index.css";

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

      let temp: Word[] = [];

      all_words.forEach((word, index) => {
        temp.push({
          word,
          color: "black",
        });
      });
      setAllWords(temp);
    })();
  }, []);

  const handleWordClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    if (isSubmitted) {
      return;
    }
    //@ts-ignore
    const selectedValue = e.target.innerText;
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
      if (goodWords.find((good) => good === selected)) {
        allWords[allWords.indexOf(foundWord)].color = "green";
      } else {
        allWords[allWords.indexOf(foundWord)].color = "red";
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
    <Center marginTop="10vh">
      <Stack>
        <Heading textAlign="center">{question}</Heading>
        <Box className="wrapper">
          {allWords.map(({ word, color }) => (
            <Text
              color={color}
              cursor="pointer"
              key={word}
              onClick={handleWordClick}
            >
              {word}
            </Text>
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
