import { throttle } from 'lodash';
import { useState, useLayoutEffect } from 'react';

/**
 * Inspired by `useWindowSize` from useHooks
 * https://usehooks.com/useWindowSize/
 */
function useWindowWidth(): number {
  const [width, setSize] = useState<number>(0);

  const updateSize = () => {
    setSize(window.innerWidth);
  };

  useLayoutEffect(() => {
    const throttleUpdateSize = throttle(updateSize, 500);
    window.addEventListener('resize', throttleUpdateSize);

    updateSize();

    return () => window.removeEventListener('resize', throttleUpdateSize);
  }, []);

  return width;
}

export default useWindowWidth;
