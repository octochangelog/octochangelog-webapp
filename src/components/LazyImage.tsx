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

const LazyImage = ({ src, loadingSrc, ...remainingProps }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Box position="relative" h={remainingProps.height} w={remainingProps.width}>
      <ChakraImage
        src={loadingSrc}
        {...remainingProps}
        opacity={!isLoaded ? 1 : 0}
        position="absolute"
        transition="opacity 500ms"
      />
      <Box
        opacity={isLoaded ? 1 : 0}
        position="absolute"
        transition="opacity 500ms"
      >
        <Image src={src} {...remainingProps} onLoad={() => setIsLoaded(true)} />
      </Box>
    </Box>
  )
}

export default LazyImage
