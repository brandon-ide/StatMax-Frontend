import axios from 'axios';

const API_URL = 'http://localhost:5050/api';

export const signupUser = (data) => axios.post(`${API_URL}/auth/signup`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);

export const createSession = (data, token) =>
  axios.post(`${API_URL}/sessions`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getSessions = (token) =>
  axios.get(`${API_URL}/sessions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
