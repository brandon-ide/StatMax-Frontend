const SessionItem = ({ session }) => {
    const { title, mode, date, stats } = session;
  
    const shootingPercentage =
      stats.shotsAttempted > 0
        ? ((stats.shotsMade / stats.shotsAttempted) * 100).toFixed(1)
        : 0;
  
    return (
      <div className="session-item">
        <h3>{title}</h3>
        <p>
          <strong>Mode:</strong> {mode}
        </p>
        <p>
          <strong>Date:</strong>{' '}
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
        <div className="stats">
          <p>Points: {stats.points}</p>
          <p>Assists: {stats.assists}</p>
          <p>Rebounds: {stats.rebounds}</p>
          <p>
            FG%: <strong>{shootingPercentage}%</strong>
          </p>
        </div>
      </div>
    );
  };
  
  export default SessionItem;
  