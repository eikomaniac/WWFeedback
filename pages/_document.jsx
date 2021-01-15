import React from 'react';
import { ColorModeScript, extendTheme } from '@chakra-ui/react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

const config = {
  initialColorMode: 'dark',
};

const theme = extendTheme({ config });

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
