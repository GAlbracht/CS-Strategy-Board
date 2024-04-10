import React from 'react';
import './maps.css';

const maps = [
    {
        name: 'Map 1',
        description: 'This is the first map.',
        imageUrl: './images/Cs2_overpass_radar.webp',
        subsections: [
            { name: 'A Site', imageUrl: './images/logo192.png' },
            { name: 'B Site', imageUrl: './images/logo192.png' },
        ],
    },
    {
        name: 'Map 2',
        description: 'This is the second map.',
        imageUrl: './images/Cs2_overpass_radar.webp',
        subsections: [
            { name: 'Long A', imageUrl: './images/logo192.png' },
            { name: 'Catwalk', imageUrl: './images/logo192.png' },
        ],
    },
    //add maps
];

const Maps = () => {
    return (
        <div className="maps-overview">
            <h1>Maps Overview</h1>
            <div className="maps-grid">
                {maps.map((map, index) => (
                    <div className="map-entry" key={index}>
                        <h2>{map.name}</h2>
                        <p>{map.description}</p>
                        <img src={map.imageUrl} alt={map.name} />
                        <div className="map-subsections-grid">
                            {map.subsections.map((subsection, subIndex) => (
                                <div className="map-subsection" key={subIndex}>
                                    <img src={subsection.imageUrl} alt={subsection.name} />
                                    <figcaption>{subsection.name}</figcaption>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Maps;
