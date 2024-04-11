import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './subsection.css';

const youtubeLinks = {
  'a-site': 'https://www.youtube.com/embed/exampleVideoID1',
  'b-site': 'https://www.youtube.com/embed/exampleVideoID2',
  'long-a': 'https://www.youtube.com/embed/exampleVideoID3',
  'catwalk': 'https://www.youtube.com/embed/exampleVideoID4',
};

const SubsectionPage = () => {
  let { subsectionName } = useParams();
  subsectionName = subsectionName.toLowerCase();

  // Find the YouTube video URL based on the subsection name
  const videoUrl = youtubeLinks[subsectionName];

  return (
    <div>
      <nav className="navigation">
      <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/maps">Map Directory</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
      </ul>
      </nav>
      <div class = 'video'>
        {videoUrl ? (
          <iframe
            width="560"
            height="315"
            src={videoUrl}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        ) : (
          <p>Video not found for this subsection.</p>
        )}
      </div>
      <div class = 'text'>
      <h4>Subsection: {subsectionName} example text, which may be a description of the salary</h4>
      </div>
    </div>

  );
};

export default SubsectionPage;
