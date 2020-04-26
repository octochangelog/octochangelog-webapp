import { AppProps } from 'next/app';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import customTheme from 'customTheme';
import { globalStyles } from 'global';

import 'highlight.styles.github.min.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={customTheme}>
    <CSSReset />
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
