import React from 'react';
import LoginForm from '../components/LoginForm';
import Register from '../components/Register';

function LoginPage() {
  return (
    <div>
      <LoginForm />
      <hr style={{maxWidth: '400px', margin: '40px auto'}} />
      <Register />
    </div>
  );
}

export default LoginPage;