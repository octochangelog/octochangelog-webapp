import React from 'react';
import { HookReturnValue } from 'models';

/**
 * Inspired by `useLocalStorage` from useHooks
 * https://usehooks.com/useLocalStorage/
 */
function useLocalStorage(
  key: string,
  initialValue?: string
): HookReturnValue<string> {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Treat error properly
      return initialValue;
    }
  });

  const setValue = React.useCallback(
    (value: string | Function) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // Treat error properly
      }
    },
    [key, storedValue]
  );

  return React.useMemo(() => [storedValue, setValue], [setValue, storedValue]);
}

export default useLocalStorage;
