import React from 'react';
import { Divider } from '@chakra-ui/core/dist';
import ReleasesPicker from 'components/ReleasesPicker';
import ReleasesResults from 'components/ReleasesResults';

const MainContent = () => {
  return (
    <>
      <ReleasesPicker />
      <Divider my={4} />
      <ReleasesResults />
    </>
  );
};

export default MainContent;
