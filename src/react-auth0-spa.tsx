import React from 'react';
import createAuth0Client, {
  Auth0ClientOptions,
  Auth0Client,
} from '@auth0/auth0-spa-js';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

const Auth0Context = React.createContext(null);
export const useAuth0 = () => React.useContext(Auth0Context);

interface Provider extends Auth0ClientOptions {
  children: React.ReactNode;
}

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: Provider) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>();
  const [user, setUser] = React.useState();
  const [auth0Client, setAuth0] = React.useState<Auth0Client>();
  const [loading, setLoading] = React.useState(true);
  const [popupOpen, setPopupOpen] = React.useState(false);

  React.useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client!.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client!.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client!.handleRedirectCallback();
    const user = await auth0Client!.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <Auth0Context.Provider
      value={
        {
          isAuthenticated,
          user,
          isLoading: loading,
          popupOpen,
          loginWithPopup,
          handleRedirectCallback,
          getIdTokenClaims: (...p: any) => auth0Client!.getIdTokenClaims(...p),
          loginWithRedirect: (...p: any) =>
            auth0Client!.loginWithRedirect(...p),
          getTokenSilently: (...p: any) => auth0Client?.getTokenSilently(...p),
          getTokenWithPopup: (...p: any) =>
            auth0Client!.getTokenWithPopup(...p),
          logout: (...p: any) => auth0Client!.logout(...p),
        } as any
      }
    >
      {children}
    </Auth0Context.Provider>
  );
};
