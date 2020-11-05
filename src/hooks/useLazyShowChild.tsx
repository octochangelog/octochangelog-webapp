import { useState, useEffect } from 'react';

/**
 * https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85#option-2-lazily-show-component-with-uselayouteffect
 */
function useIsClientSideHydrated(): boolean {
  const [shouldShowChild, setShouldShowChild] = useState<boolean>(false);

  useEffect(function waitClientSideHydrationEffect() {
    setShouldShowChild(true);
  }, []);

  return shouldShowChild;
}

export default useIsClientSideHydrated;
