import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import logowhite from '../assets/logowhite.png';

const statsList = ["points", "rebounds", "assists", "blocks", "steals"];

const Rankings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [rankings, setRankings] = useState(null);
  const [activeStat, setActiveStat] = useState("points");

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/rankings", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        setRankings(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRankings();
  }, [user]);

  if (!rankings) return <p>Loading rankings...</p>;

  return (
    <div className="rankingsPage">
      <div className="newSessionHeader">
      <img src={logowhite} alt="StatMax Logo White" className="dashboardLogoWhite" />
      <h1 id="newSessionTop">StatMax Rankings Board</h1>
      <button 
        className="goBackButton" 
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
      </div>

      <div className="rankingTabs">
        {statsList.map((stat) => (
          <button
            key={stat}
            onClick={() => setActiveStat(stat)}
            className={activeStat === stat ? "activeTab" : ""}
          >
            {stat.charAt(0).toUpperCase() + stat.slice(1)}
          </button>
        ))}
      </div>

      <ul className="rankingList">
        {rankings[activeStat].map((u, index) => (
          <li key={u.username} className="rankingItem">
            <strong>#{index + 1}</strong> — {u.username}  
            <span style={{ marginLeft: "10px", color: "#fc9e23" }}>
              {u[activeStat]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rankings;
