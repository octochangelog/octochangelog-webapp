import React from 'react';
import { Button } from '@chakra-ui/core';
import { useAuth0 } from 'react-auth0-spa';

const Login = () => {
  const { loginWithRedirect }: any = useAuth0();

  return <Button onClick={() => loginWithRedirect({})}>Auth GitHub</Button>;
};

export default Login;
