/**
 * @module
 * Inspired by `useAuth` and `useLocalStorage` from useHooks
 * https://usehooks.com/
 */

import React from 'react';
import { HookReturnValue } from 'models';
import useLocalStorage from 'hooks/useLocalStorage';

const LOCAL_STORAGE_KEY: string = 'gh-token';
const authContext = React.createContext<HookReturnValue<string> | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useLocalStorage(LOCAL_STORAGE_KEY);
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth(): HookReturnValue<string> {
  const context = React.useContext(authContext);

  if (!context) {
    throw new Error('`useAuth` should be used wrapper under `AuthProvider`');
  }

  return context;
}
