import React from 'react';
import ReactDOM from 'react-dom';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import App from 'components/App';
import * as serviceWorker from 'serviceWorker';
import customTheme from 'customTheme';
import { globalStyles } from 'global';
import { Auth0Provider } from 'react-auth0-spa';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Global styles={globalStyles} />
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN || 'unknown'}
        client_id={process.env.REACT_APP_AUTH0_CLIENT_ID || 'unknown'}
        redirect_uri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
