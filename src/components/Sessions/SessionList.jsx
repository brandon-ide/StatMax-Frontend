import React from 'react';
import SessionItem from './SessionItem';

const SessionList = ({ sessions }) => {
  if (!sessions.length) return <p>Record Your First Session, then come back here.</p>;

  return (
    <div className="sessionListContainer">
    <h1 className="sessionListHeader">Your Past Sessions</h1>
    <ul>
      {sessions.map((session) => (
        <SessionItem key={session._id} session={session} />
      ))}
    </ul>
    </div>
  );
};

export default SessionList;
