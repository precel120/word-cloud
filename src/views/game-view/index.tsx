import * as React from "react";
import { Heading, Center, Stack, Box, Button, Text } from "@chakra-ui/react";
import { GameData } from "./types";

const GameView = () => {
  const [question, setQuestion] = React.useState<string>();
  const [goodWords, setGoodWords] = React.useState<string[]>();
  const [allWords, setAllWords] = React.useState<string[]>();
  const [selectedWords, setSelectedWords] = React.useState<string[]>([]);

  React.useEffect(() => {
    (async function () {
      // TODO: Randomize this
      const data = await fetch("./animals.json");
      const { question, good_words, all_words }: GameData = await data.json();
      setQuestion(question);
      setGoodWords(good_words);
      setAllWords(all_words);
    })();
  }, []);

  const handleWordClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    //@ts-ignore
    const selectedValue = e.target.innerText;
    setSelectedWords(
      selectedWords.find((word) => word === selectedValue)
        ? selectedWords.filter((word) => word !== selectedValue)
        : [selectedValue, ...selectedWords]
    );
  };

  const handleSubmit = () => {
    
  };
  console.log(selectedWords);

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
          {allWords?.map((word) => (
            <Text
              position="absolute"
              left={Math.random() * 200}
              top={Math.random() * 200}
              key={word}
              cursor="pointer"
              color={
                selectedWords.find((selectedWord) => selectedWord === word)
                  ? "grey"
                  : "black"
              }
              onClick={handleWordClick}
            >
              {word}
            </Text>
          ))}
        </Box>
        <Button onClick={handleSubmit}>Check answers</Button>
      </Stack>
    </Center>
  );
};

export default GameView;
