import React from 'react';
import { useAuth } from 'auth';
import { Button } from '@chakra-ui/core/dist';

const Login = () => {
  const [, setToken] = useAuth();
  return <Button onClick={() => setToken('123')}>Auth GitHub</Button>;
};

export default Login;
