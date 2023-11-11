// AuthPage.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthProvider';
import Login from './Login';
import Registration from './Registration';
import Carousel from '../components/Carousel';

const AuthPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <AuthProvider>
      <div>
        {isRegistering ? <Registration redirect={redirect} /> : <Login redirect={redirect} />}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Log in' : 'Need to register? Sign up'}
        </button>
      </div>
    </AuthProvider>
  );
};

export default AuthPage;
