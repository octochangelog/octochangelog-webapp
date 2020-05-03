import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import customTheme from 'customTheme';
import { globalStyles } from 'global';
import * as gtag from 'gtag';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';

import 'highlight.styles.github.min.css';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});
Router.events.on('routeChangeComplete', (url) => {
  gtag.pageView(url);
  NProgress.done();
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={customTheme}>
    <CSSReset />
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
