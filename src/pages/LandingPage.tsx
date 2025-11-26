import React from 'react';
import logowhite from '../assets/logowhite.png';
import playerBackground from '../assets/tatumdribble.webp';

const LandingPage: React.FC = () => {
    return (
        <div className="backgroundImageWrapper">
          <img src={playerBackground} alt="Player Dribbling Background" className="backgroundImage" />
          <div className="overlay"></div>
          <div className="logoAndTagLine">
          <img src={logowhite} alt="StatMax Logo White" className="logoWhite" />
          <h2 id="tagLine">
            Track your stats.<br />See your rank.<br />Be the best.<br />Period.
          </h2>
        </div>
        </div>
    );
  };
  
  export default LandingPage;