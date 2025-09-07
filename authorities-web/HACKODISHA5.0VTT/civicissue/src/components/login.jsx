// ...existing code...
import axios from 'axios';
import React, { useState } from 'react';
import api from "../client/Client.jsx";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/api/auth/login/authority', { email, password });
      if (res.data.success) {
        localStorage.setItem('authSuccess', res.data.success);
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        }
        if (onSuccess) onSuccess(res.data);
      } else {
        setError('Unexpected response from server');
      }
    } catch (err) {
      if (err.response?.status === 401) setError('Unauthorized');
      else setError(err.message || 'Request failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <button type="submit">Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}