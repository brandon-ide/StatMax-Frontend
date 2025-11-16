import React from 'react';
import SessionItem from './SessionItem';

const SessionList = ({ sessions, setSessions }) => {

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
