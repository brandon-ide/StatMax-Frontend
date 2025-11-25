const BASE_URL = "http://localhost:5050/api";

export interface UserLoginResponse {
  token: string;
  username: string;
  email: string;
}

export interface UserSignupResponse {
  message: string;
  userId: string;
}

export interface SessionStats {
  points?: number;
  rebounds?: number;
  assists?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  shotsMade?: number;
  shotsAttempted?: number;
  shootingPercentage?: number;
}

export interface Session {
  _id?: string;
  title: string;
  mode: string;
  stats: SessionStats;
}

export interface ApiError {
  error: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<UserLoginResponse | ApiError> => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

export const signupUser = async (
  username: string,
  email: string,
  password: string
): Promise<UserSignupResponse | ApiError> => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  return res.json();
};

export const fetchSessions = async (
  token: string
): Promise<Session[]> => {
  const res = await fetch(`${BASE_URL}/sessions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createSession = async (
  token: string,
  sessionData: Session
): Promise<Session | ApiError> => {
  const res = await fetch(`${BASE_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sessionData),
  });

  return res.json();
};

export const updateSession = async (
  token: string,
  sessionId: string,
  sessionData: Session
): Promise<Session | ApiError> => {
  const res = await fetch(`${BASE_URL}/sessions/${sessionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sessionData),
  });

  return res.json();
};

export const deleteSession = async (
  token: string,
  sessionId: string
): Promise<{ message: string } | ApiError> => {
  const res = await fetch(`${BASE_URL}/sessions/${sessionId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json();
};
