import React from 'react';
import { Link, useParams } from 'react-router-dom';
import mapsData from './mapsdata'; // Adjust the path as necessary
import './tactics.css';

const SubsectionPage = () => {
  const { mapName, subsectionName } = useParams();

  const mapNameNormalized = mapName.toLowerCase();
  const subsectionNameNormalized = subsectionName.split('-').join(' ');
  console.log(subsectionNameNormalized);

  const map = mapsData.find(m => m.name.toLowerCase() === mapNameNormalized);


  const tactic = map.map.tactics.find(t => t.name === subsectionNameNormalized);


  const videoUrl = tactic.videoUrl;
  console.log("Video URL:", tactic.videoUrl);
  return (
    <div>
      <nav className="navigation">
        <ul>
          <li><Link to="/maps"><img src='images/logo.webp' /></Link></li>
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
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Video not found for this tactic.</p>
        )}
      </div>
      <div className='text'>
        <h4>Subsection: {tactic.name} - example text of video description</h4>
      </div>
    </div>
  );
};

export default SubsectionPage;
