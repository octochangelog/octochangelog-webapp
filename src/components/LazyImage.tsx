import { Box, Image as ChakraImage } from '@chakra-ui/react'
import NextImage, { ImageProps } from 'next/image'
import { useState } from 'react'

type Props = ImageProps & {
  loadingSrc: string
}

const LazyImage = ({
  src,
  loadingSrc,
  height,
  width,
  ...remainingProps
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const dynamicWidth = `min(${width}px, 95vw)`
  const dynamicHeight = `min(${height}px, 95vw)`

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
        {/* TODO: ImageProps available now from next/image but throwing some types issues */}
        {/* @ts-ignore */}
        <NextImage
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
