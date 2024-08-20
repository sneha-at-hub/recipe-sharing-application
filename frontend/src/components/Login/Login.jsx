import { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('isLoggedIn', 'true'); // Set login flag
        // Redirect the user
        window.location.href = '/';
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="Login">
      <div className="right-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn1">
            Login
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>Don't have an account? <a href="/signup">Signup</a></p>
      </div>
      <div className="left-container">
        <div className="contain"></div>
      </div>
    </div>
  );
};

export default Login;
