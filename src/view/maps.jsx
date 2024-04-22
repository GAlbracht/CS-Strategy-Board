import React from 'react';
import { Link } from 'react-router-dom';
import mapsData from '../model/mapsdata.js';
import './maps.css';

const Maps = () => {
    const isAdmin = true; // set to true to show admin upload button
    return (
      <div>
        <nav>
        <Link to="/maps"><img src='images/logo.webp' alt="Maps" /></Link>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/maps">Map Directory</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            {/* if admin */}
            {isAdmin && <li><Link to="/admin-upload">Upload</Link></li>}
          </ul>
        </nav>
        <div className="maps-overview">
          <h1>Maps Overview</h1>
          <div className="maps-grid">
            {mapsData.map((map, index) => (
              <div className="map-entry" key={index}>
                <Link to={`/${map.name}`}>
                  <h2>{map.name}</h2>
                  <p>{map.description}</p>
                  <img src={map.map.imageUrl} alt={map.name} />
                </Link>
                {map.map.tactics && (
                  <div className="map-subsections-grid">
                    {map.map.tactics.map((tactic, subIndex) => (
                      <Link to={`/${map.name}/${tactic.name.replace(/ /g, '-')}`} key={subIndex}>
                        <div className="map-subsection">
                          <img src={tactic.imageUrl} alt={tactic.name} />
                          <figcaption>{tactic.name}</figcaption>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Maps;
  
