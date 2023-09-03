import React from 'react';
import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react';
import { MoralisProvider } from 'react-moralis';
import LandingPage from './pages/LandingPage';
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        overflowY: 'hidden',
      },
    },
  },
});

function App() {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ChakraProvider theme={theme}>
        <LandingPage />
      </ChakraProvider>
    </MoralisProvider>
  );
}

export default App;
