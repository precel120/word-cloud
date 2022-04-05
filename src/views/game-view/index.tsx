import * as React from "react";
import { Heading, Center, Stack, Box, Button, Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { GameData, Word, Position } from "./types";

const GameView = () => {
  const [question, setQuestion] = React.useState<string>();
  const [goodWords, setGoodWords] = React.useState<string[]>([]);
  const [allWords, setAllWords] = React.useState<Word[]>([]);
  const [selectedWords, setSelectedWords] = React.useState<string[]>([]);
  const [positions, setPositions] = React.useState<Position[]>([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false)

  React.useEffect(() => {
    (async function () {
      // TODO: Randomize this
      const data = await fetch("./animals.json");
      const { question, good_words, all_words }: GameData = await data.json();
      setQuestion(question);
      setGoodWords(good_words);

      let temp: Word[] = [];
      let tempPositions: Position[] = [];

      all_words.forEach((word, index) => {
        temp.push({
          word,
          color: "black",
          position: {left: Math.random() * 200, top: Math.random() * 200}
        });
        tempPositions.push({left: temp[index].position.left, top: temp[index].position.top})
      });
      setAllWords(temp);
      setPositions(tempPositions)
    })();
  }, []);

  const handleWordClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    if(isSubmitted) {
      return
    }
    //@ts-ignore
    const selectedValue = e.target.innerText;
    const wasInSelectedWords: boolean = !!selectedWords.find((word) => word === selectedValue)
    const foundWord = allWords.find((word) => word.word === selectedValue)
    if(!foundWord) {
      return
    }
    setSelectedWords(
      wasInSelectedWords
        ? selectedWords.filter((word) => word !== selectedValue)
        : [selectedValue, ...selectedWords]
    );
    allWords[allWords.indexOf(foundWord)].color = wasInSelectedWords ? 'black' : 'grey'
  };

  const handleSubmit = () => {
    selectedWords.forEach((selected) => {
      const foundWord = allWords.find(({word}) => word === selected)
      if(!foundWord) {
        return
      }
      if(goodWords.find((good) => good === selected)) {
        allWords[allWords.indexOf(foundWord)].color = 'green'
      } else {
        allWords[allWords.indexOf(foundWord)].color = 'red'
      }
    })
    setIsSubmitted(true);
  };
  const handleFinishGame = () => {
    setIsFinished(true)
  };

  return (
    <Center>
      <Stack>
        <Heading>{question}</Heading>
        <Box
          borderWidth="2px"
          borderRadius="lg"
          color="black"
          position="relative"
          height="20vh"
          width="40vw"
        >
          {allWords.map(({word, color, position}) => (
            <Text
              position="absolute"
              left={position.left}
              top={position.top}
              key={word}
              cursor="pointer"
              color={color}
              onClick={handleWordClick}
            >
              {word}
            </Text>
          ))}
        </Box>
        {!isSubmitted ? (
          <Button onClick={handleSubmit} isDisabled={selectedWords.length <= 0}>Check answers</Button>
        ) : (
          <Button onClick={handleFinishGame}>Finish game</Button>
        )}
      </Stack>
      {isFinished && <Navigate to="/summary"/>}
    </Center>
  );
};

export default GameView;
