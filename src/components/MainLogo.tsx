import { Image } from '@chakra-ui/core';
import { Box } from '@chakra-ui/core';
import React from 'react';

/* eslint-disable import/order */
// @ts-ignore
import Logo from '../../public/mascot-logo.png?resize&sizes[]=300&sizes[]=500&sizes[]=800';
// @ts-ignore
import WebpLogo from '../../public/mascot-logo.png?webp&resize&sizes[]=300&sizes[]=500&sizes[]=800';
/* eslint-enable import/order */

const MainLogo = () => {
  return (
    <Box as="picture">
      <source srcSet={WebpLogo.srcSet} type="image/webp" />
      <source srcSet={Logo.srcSet} type="image/png" />
      <Image src={Logo.src} alt="Octoclairvoyant reading a crystal ball" />
    </Box>
  );
};

export default MainLogo;
