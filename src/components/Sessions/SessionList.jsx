import React from 'react';
import SessionItem from './SessionItem';

const SessionList = ({ sessions }) => {
  if (!sessions.length) return <p>No sessions yet.</p>;

  return (
    <ul>
      {sessions.map((session) => (
        <SessionItem key={session._id} session={session} />
      ))}
    </ul>
  );
};

export default SessionList;
