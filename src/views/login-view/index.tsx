import * as React from "react";
import { Center, Stack, Button, Input, Heading } from "@chakra-ui/react";

const LoginView = () => {
  const [loginCredentials, setLoginCredentials] = React.useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials(e.target.value);
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
        <Button isDisabled={!loginCredentials?.length}>Play</Button>
      </Stack>
    </Center>
  );
};

export default LoginView;
