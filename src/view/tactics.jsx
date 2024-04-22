import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import mapsData from '../model/mapsdata';
import './tactics.css';

const SubsectionPage = () => {
  const { mapName, subsectionName } = useParams();

  const mapNameNormalized = mapName.toLowerCase();
  const subsectionNameNormalized = subsectionName.split('-').join(' ');
  console.log(subsectionNameNormalized);

  const map = mapsData.find(m => m.name.toLowerCase() === mapNameNormalized);
  const tactic = map.map.tactics.find(t => t.name === subsectionNameNormalized);
  const videoUrl = tactic.videoUrl;

  // State for tracking likes
  const [liked, setLiked] = useState(false);

  // Handle Like button click
  const toggleLike = () => {
    setLiked(!liked);
  };

  console.log("Video URL:", tactic.videoUrl);
  return (
    <div>
      <nav className="navigation">
      <li><Link to="/maps"><img src='images/logo.webp' alt='Logo' /></Link></li>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/maps">Map Directory</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </nav>
      <div className='video'>
        {videoUrl ? (
          <iframe
            width="560"
            height="315"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Video not found for this tactic.</p>
        )}
              <button className={`like-button ${liked ? 'liked' : ''}`} onClick={toggleLike}>
        {liked ? 'Unlike' : 'Like'}
      </button>
      </div>
      <div className='text'>
        <h4>this is example text for the {tactic.name} tactic</h4>
      </div>
    </div>
  );
};

export default SubsectionPage;
