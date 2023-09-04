import { Box, Button, Center, ChakraProvider, Container, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import RegistrationForm from '@/components/RegistrationForm';

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <ChakraProvider>
      <Center height="100vh">
        <Container p={6} boxShadow="md" rounded="lg">
          <Heading as="h1" mb={4}>
            {isLogin ? 'Log in' : 'Register'}
          </Heading>
          {isLogin ? (
            <LoginForm onLogin={() => alert('Logged in')} />
          ) : (
            <RegistrationForm onRegister={() => alert('Registered')} />
          )}
          <Box mt={4}>
            <Button colorScheme="teal" onClick={handleToggleForm}>
              {isLogin ? 'Create an account' : 'Already have an account? Log in'}
            </Button>
          </Box>
        </Container>
      </Center>
    </ChakraProvider>
  );
};

export default Home;
