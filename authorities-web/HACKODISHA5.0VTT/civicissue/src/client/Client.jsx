// ...existing code...
import axios from 'axios';

const api = axios.create({
  baseURL: '/', // change to 'http://localhost:5000' if backend runs elsewhere
  headers: { 'Content-Type': 'application/json' },
});

export default api;