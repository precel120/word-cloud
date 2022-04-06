import * as React from "react";
import { Center, Stack, Button, Input, Heading } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserName } from "../../redux/slice";

const LoginView = () => {
  const [loginCredentials, setLoginCredentials] = React.useState<string>("");
  const [wasButtonPressed, setWasButtonPressed] =
    React.useState<boolean>(false);

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials(e.target.value);
  };

  const handleClick = () => {
    dispatch(setUserName(loginCredentials));
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
