import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import ExmText from './ExmText';

const Sidebar = ({ user }) => {
  return (
    <Box w="200px" bg="white" boxShadow="lg" minH="calc(100vh)">
      <VStack>
        <ExmText />
        <HStack m="2%">
          <Avatar
            size="xl"
            border="2px solid white"
            boxShadow="lg"
            showBorder={true}
          />
          <VStack align="start">
            <Text fontSize="md" fontWeight="bold">
              {user.fullName}
            </Text>
            <Text fontSize="md" color="gray">
              {user.role}
            </Text>
          </VStack>
        </HStack>
        <Text fontSize="sm">{user.email}</Text>
      </VStack>
    </Box>
  );
};

export default Sidebar;
