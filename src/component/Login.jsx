import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import { loginUser } from '../API'; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset error state on new submission

    loginUser(credentials)
      .then(result => {
        if (result.token) {
          login(result.token); // This should handle setting isAuthenticated and storing the token
          navigate('/'); // Redirect to the home page after successful login
        } else {
          throw new Error('Login failed: No token received');
        }
      })
      .catch(error => {
        console.error('Login failed:', error);
        setError(error.message || 'Login failed. Please try again.');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
