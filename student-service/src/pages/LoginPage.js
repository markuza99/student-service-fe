import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { ConnectButton } from '@web3uikit/web3';
import React from 'react';
import ExmText from '../components/ExmText';

const LoginPage = () => {
  return (
    <Flex align="center" justify="center" height="100vh" textAlign="center">
      <Center
        width="30%"
        height="30%"
        borderRadius="md"
        bg="white"
        boxShadow="lg"
      >
        <Box>
          <ExmText />
          <br></br>
          <ConnectButton></ConnectButton>
        </Box>
      </Center>
    </Flex>
  );
};

export default LoginPage;
