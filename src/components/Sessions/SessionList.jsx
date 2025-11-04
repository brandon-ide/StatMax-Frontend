import SessionItem from './SessionItem';

const SessionList = ({ sessions }) => {
  return (
    <div className="session-list">
      {sessions.map((session) => (
        <SessionItem key={session._id} session={session} />
      ))}
    </div>
  );
};

export default SessionList;
