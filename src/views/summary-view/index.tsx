import * as React from "react";
import { Heading, Center, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import "../game-view/game.scss"

const SummaryView = () => {
  const userName = useSelector((state: RootState) => state.game.userName);
  const { right, missed, wrong } = useSelector(
    (state: RootState) => state.game.score
  );

  const countScore = (): number => {
    console.log(`right: ${right} wrong: ${wrong} missed: ${missed}`);
    return right * 2 - (wrong + missed);
  };

  return (
    <Center className="center">
      <Stack>
        <Heading>Congratulations, {userName}!</Heading>
        <Heading>Your score:</Heading>
        <Text color="blue">{countScore()} points</Text>
      </Stack>
    </Center>
  );
};

export default SummaryView;
