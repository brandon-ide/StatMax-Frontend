import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logowhite from "../assets/logowhite.png";

type StatKey = "points" | "rebounds" | "assists" | "blocks" | "steals";

interface User {
  username: string;
  points?: number;
  rebounds?: number;
  assists?: number;
  blocks?: number;
  steals?: number;
}

interface RankingsData {
  points: User[];
  rebounds: User[];
  assists: User[];
  blocks: User[];
  steals: User[];
}

const statsList: StatKey[] = ["points", "rebounds", "assists", "blocks", "steals"];

const Rankings = () => {
const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext must be used within an AuthProvider");
const { user } = authContext;

const navigate = useNavigate();
const [rankings, setRankings] = useState<RankingsData | null>(null);
const [activeStat, setActiveStat] = useState<StatKey>("points");

  useEffect(() => {
    const fetchRankings = async () => {
      if (!user) return;
      try {
        const res = await fetch("http://localhost:5050/api/rankings", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data: RankingsData = await res.json();
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
        <button className="goBackButton" onClick={() => navigate(-1)}>
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
              {u[activeStat] || 0}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rankings;
