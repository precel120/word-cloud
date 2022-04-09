import * as React from "react";
import { Heading, Center, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import "../game-view/game.scss";

const SummaryView = () => {
  const userName = useSelector(({ game: { userName } }: RootState) => userName);
  const { right, missed, wrong } = useSelector(
    ({ game: { score } }: RootState) => score
  );

  const countScore = React.useCallback((): number => {
    return right * 2 - (wrong + missed);
  }, [right, wrong, missed]);

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
