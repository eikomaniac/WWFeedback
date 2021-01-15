import { ChakraProvider, theme } from '@chakra-ui/react';

import '../styles/globals.css';

function WWFeedback({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default WWFeedback;
