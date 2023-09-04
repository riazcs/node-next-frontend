// client/pages/register.js
import React from 'react';
import Layout from '../components/Layout';
import RegisterForm from '../components/RegistrationForm';

const Register = () => {
  return (
    <Layout>
      <h1>Register</h1>
      <RegisterForm />
    </Layout>
  );
};

export default Register;
