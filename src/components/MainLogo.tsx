import { Image } from '@chakra-ui/core';
import { Box } from '@chakra-ui/core';
import React from 'react';

/* eslint-disable import/order */
// @ts-ignore
import Logo from '../../public/mascot-logo.png?resize';
/* eslint-enable import/order */

const MainLogo = () => {
  return (
    <Box as="picture">
      <source
        srcSet="/mascot-logo-xs.webp 100w,/mascot-logo-sm.webp 250w,/mascot-logo-md.webp 500w,/mascot-logo-lg.webp 900w"
        type="image/webp"
      />
      <source srcSet={Logo.srcSet} type="image/png" />
      <Image src={Logo.src} alt="Octoclairvoyant reading a crystal ball" />
    </Box>
  );
};

export default MainLogo;
