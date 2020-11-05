import { Box, Image as ChakraImage } from '@chakra-ui/core'
import Image from 'next/image'
import { useState } from 'react'

// TODO: extend ImageProps when exported from next/image
type Props = {
  loadingSrc: string
  src: string
  alt: string
  width: number
  height: number
  quality: number
}

const LazyImage = ({
  src,
  loadingSrc,
  height,
  width,
  ...remainingProps
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const dynamicWidth = `min(${width}px, 100vw)`
  const dynamicHeight = `min(${height}px, 100vw)`

  return (
    <Box position="relative" height={dynamicWidth} width={dynamicHeight}>
      <ChakraImage
        src={loadingSrc}
        {...remainingProps}
        opacity={!isLoaded ? 1 : 0}
        position="absolute"
        transition="opacity 500ms"
        height={dynamicWidth}
        width={dynamicHeight}
      />
      <Box
        opacity={isLoaded ? 1 : 0}
        position="absolute"
        transition="opacity 500ms"
      >
        <Image
          src={src}
          height={height}
          width={width}
          {...remainingProps}
          onLoad={() => setIsLoaded(true)}
        />
      </Box>
    </Box>
  )
}

export default LazyImage
