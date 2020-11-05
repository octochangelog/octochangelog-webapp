import * as React from 'react'

function useIsStick(
  elRef: React.MutableRefObject<{ offsetTop: number }>
): boolean {
  const [isStick, setIsStick] = React.useState(false)

  React.useEffect(() => {
    const initialYOffset = elRef.current.offsetTop

    const handler = () => {
      setIsStick(!!initialYOffset && window.pageYOffset > initialYOffset)
    }

    window.addEventListener('scroll', handler, {
      capture: false,
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isStick
}

export default useIsStick
