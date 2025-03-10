import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Remplacez par votre URL d'API
});

export default api;