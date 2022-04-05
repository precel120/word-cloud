import * as React from "react";
import { Heading, Center, Stack, Text } from "@chakra-ui/react";

const SummaryView = () => {
  return (
    <Center>
      <Stack>
        <Heading>Congratulations, name here!</Heading>
        <Heading>Your score:</Heading>
        <Text color="blue">point points</Text>
      </Stack>
    </Center>
  );
};

export default SummaryView;
