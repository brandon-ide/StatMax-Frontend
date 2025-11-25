// src/components/Sessions/SessionList.tsx
import React from 'react';
import SessionItem from './SessionItem';

export interface Stats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  shotsMade: number;
  shotsAttempted: number;
  shootingPercentage: number;
}

export interface Session {
  _id: string;
  title: string;
  date: string;
  mode: string;
  stats: Stats;
}

interface SessionListProps {
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
}

const SessionList: React.FC<SessionListProps> = ({ sessions, setSessions }) => {
  return (
    <div className="sessionListContainer">
      <h1 className="sessionListHeader">Your Past Sessions</h1>
      <ul>
        {sessions.map((session) => (
          <SessionItem 
            key={session._id} 
            session={session} 
            setSessions={setSessions} 
          />
        ))}
      </ul>
    </div>
  );
};

export default SessionList;
