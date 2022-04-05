import * as React from "react";
import { Center, Stack, Button, Input, Heading } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

const LoginView = () => {
  const [loginCredentials, setLoginCredentials] = React.useState<string>("");
  const [wasButtonPressed, setWasButtonPressed] =
    React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials(e.target.value);
  };

  const handleClick = () => {
    setWasButtonPressed(true);
  };

  return (
    <Center>
      <Stack>
        <Heading>Wordcloud game</Heading>
        <Input
          value={loginCredentials}
          onChange={handleChange}
          placeholder="Enter your nickname here..."
        />
        <Button isDisabled={!loginCredentials?.length} onClick={handleClick}>
          Play
        </Button>
      </Stack>
      {wasButtonPressed && <Navigate to="/game" />}
    </Center>
  );
};

export default LoginView;
