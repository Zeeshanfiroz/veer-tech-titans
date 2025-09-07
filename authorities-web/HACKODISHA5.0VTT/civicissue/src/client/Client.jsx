// ...existing code...
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://51.20.18.40:8080/', // change to 'http://localhost:5000' if backend runs elsewhere
  headers: { 'Content-Type': 'application/json' },
});

export default api;
