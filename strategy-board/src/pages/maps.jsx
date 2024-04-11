import React from 'react';
import { Link } from 'react-router-dom';
import './maps.css';

const maps = [
    {
        name: 'inferno',
        description: 'This is the first map.',
        imageUrl: './images/inferno.webp',
        subsections: [
            { name: 'A Site', imageUrl: './images/inferno-a-site.jpg' },
            { name: 'B Site', imageUrl: './images/inferno-b-site.jpg' },
        ],
    },
    {
        name: 'overpass',
        description: 'This is the second map.',
        imageUrl: './images/Cs2_overpass_radar.webp',
        subsections: [
            { name: 'Long A', imageUrl: './images/logo192.png' },
            { name: 'Catwalk', imageUrl: './images/logo192.png' },
        ],
    },
    {
        name: 'dust2',
        description: 'This is the third map.',
        imageUrl: 'images/dust2.png',
        subsections: [
            { name: 'A Site', imageUrl: './images/logo192.png' },
            { name: 'B Site', imageUrl: './images/logo192.png' },
        ],
    },
    {
        name: 'mirage',
        description: 'This is the fourth map.',
        imageUrl: './images/mirage.png',
        subsections: [
            { name: 'A Site', imageUrl: './images/logo192.png' },
            { name: 'B Site', imageUrl: './images/logo192.png' },
        ],
    },
    {
        name: 'nuke',
        description: 'This is the fifth map.',
        imageUrl: './images/nuke.webp',
        subsections: [
            { name: 'A Site', imageUrl: './images/logo192.png' },
            { name: 'B Site', imageUrl: './images/logo192.png' },
        ],
    },
    {
        name: 'train',
        description: 'This is the sixth map.',
        imageUrl: './images/train.png',
        subsections: [
            { name: 'A Site', imageUrl: './images/logo192.png'},
            { name: 'B Site', imageUrl: './images/logo192.png' },
        ],
    },
];

const Maps = () => {
    
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/maps">Map Directory</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </ul>
            </nav>
            <div className="maps-overview">
                <h1>Maps Overview</h1>
                <div className="maps-grid">
                    {maps.map((map, index) => (
                        <div className="map-entry" key={index}>
                            <Link to={`/${map.name}`}>
                                <h2>{map.name}</h2>
                                <p>{map.description}</p>
                                <img src={map.imageUrl} alt={map.name} />
                            </Link>
                            <div className="map-subsections-grid">
                                {map.subsections.map((subsection, subIndex) => (
                                    <Link to={`/${map.name}/${subsection.name.toLowerCase().replace(' ', '-')}`} key={subIndex}>
                                        <div className="map-subsection">
                                            <img src={subsection.imageUrl} alt={subsection.name} />
                                            <figcaption>{subsection.name}</figcaption>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Maps;
