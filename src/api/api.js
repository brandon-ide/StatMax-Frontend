const BASE_URL = 'http://localhost:5050/api';

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const signupUser = async (username, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
};

export const fetchSessions = async (token) => {
  const res = await fetch(`${BASE_URL}/sessions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createSession = async (token, sessionData) => {
  const res = await fetch(`${BASE_URL}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(sessionData),
  });
  return res.json();
};

export const updateSession = async (token, sessionId, sessionData) => {
  const res = await fetch(`${BASE_URL}/sessions/${sessionId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(sessionData),
  });
  return res.json();
};

export const deleteSession = async (token, sessionId) => {
  const res = await fetch(`${BASE_URL}/sessions/${sessionId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
