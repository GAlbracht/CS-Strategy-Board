import React from 'react';
import { Link } from 'react-router-dom';
import './Overpass.css'; 

function InfernoPage() {
  const galleryImages = Array.from({ length: 6 }, (_, i) => i + 1); //creates array [1, 2, 3, 4, 5, 6]

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/maps"><img src='images/logo.webp' /></Link></li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/maps">Map Directory</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </nav>

      <div className="container">
        <div className="map">
          <div className="map-headers">
            <Link to="/clear"><h2>Clear</h2></Link>
            <Link to="/overpass"><h2>Overpass</h2></Link>
            <Link to="/mirage"><h3>Mirage</h3></Link>
            <Link to="/dust2"><h3>Dust 2</h3></Link>
            <Link to="/inferno"><h3>Inferno</h3></Link>
            <Link to="/nuke"><h3>Nuke</h3></Link>
            <Link to="/train"><h3>Train</h3></Link>
          </div>
          
          <img src="images/inferno.webp" alt="inferno" />
          
          <ul>
            <li>Grenade</li>
            <li>Molotov</li>
            <li>Flashbang</li>
            <li>Smoke</li>
          </ul>
        </div>

        <div className="gallery">
          {galleryImages.map(number => (
            <figure key={number} className={`gallery__item gallery__item--${number}`}>
              <a href="#"><img src="images/inferno.webp" className="gallery__img" alt={`Image ${number}`} /></a>
              <figcaption><a href="#">Image {number}</a></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfernoPage;
