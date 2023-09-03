import { Box, Flex } from '@chakra-ui/react';
import { ConnectButton } from '@web3uikit/web3';
import React from 'react';

const Navbar = () => {
  return (
    <Box bg="white" boxShadow="lg" h="10%">
      <Flex justify="space-between" alignItems="center">
        <p>{''}</p>
        <Box m="1%">
          <ConnectButton></ConnectButton>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
