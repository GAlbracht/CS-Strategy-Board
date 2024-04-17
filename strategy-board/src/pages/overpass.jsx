import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Overpass.css';
import mapsData from './mapsdata';

function OverpassPage() {
  const { mapName } = useParams();
  const dropZoneRef = useRef(null);
  const [droppedItems, setDroppedItems] = useState([]);


  
  if (!mapName) {
    return <div>Loading or invalid map name...</div>;
  }

  const map = mapsData.find(m => m.name.toLowerCase() === mapName.toLowerCase());
  

  const generateId = (() => {
    let count = 0;
    return () => count++;
  })();
  const items = [
    { id: generateId(), name: 'Grenade', imageUrl: '/images/grenade.webp' },
    { id: generateId(), name: 'Molotov', imageUrl: '/images/molotov.webp' },
    { id: generateId(), name: 'Flashbang', imageUrl: '/images/flashbang.webp' },
    { id: generateId(), name: 'Smoke', imageUrl: '/images/smoke.png' },
  ];

  const handleDragStart = (event, item) => {
    const objectToTransfer = { ...item };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(objectToTransfer));
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('application/reactflow');
    const item = JSON.parse(data);
    const rect = dropZoneRef.current.getBoundingClientRect();
    const dragImageWidth = 50;
    const dragImageHeight = 50;
    const x = event.clientX - rect.left - dragImageWidth / 2;
    const y = event.clientY - rect.top - dragImageHeight / 2;

    const existingItemIndex = droppedItems.findIndex(di => di.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedItems = [...droppedItems];
      updatedItems[existingItemIndex] = { ...item, x, y };
      setDroppedItems(updatedItems);
    } else {
      setDroppedItems(currentItems => [...currentItems, { ...item, x, y, id: generateId() }]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  return (
    <div>
      <nav>
      <Link to="/maps"><img src='images/logo.webp' alt="Maps" /></Link>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/maps">Map Directory</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </nav>

      <div className="container">
        <div className="map">
          <div className="drop-zone" ref={dropZoneRef} onDrop={handleDrop} onDragOver={handleDragOver}>
            <img src={map.map.imageUrl} alt={map.name} />
            {droppedItems.map((item) => (
              <img key={item.id} src={item.imageUrl} alt={item.name} draggable onDragStart={(event) => handleDragStart(event, item)}
                style={{ position: 'absolute', left: `${item.x}px`, top: `${item.y}px`, width: '50px' }} className="dropped-item" />
            ))}
          </div>
          <ul>
          <div className="items-list">
            {items.map((item, index) => (
              <img key={index} src={item.imageUrl} alt={item.name} draggable onDragStart={(event) => handleDragStart(event, item)} className="draggable-item" />
            ))}
          </div>
        </ul>
        </div>



        <div className="gallery">
          {map.map.tactics.map((tactic, index) => (
            <figure key={index} className={`gallery__item gallery__item--${index + 1}`}>
              <Link to={`/${map.name}/${tactic.name.replace(/ /g, '-')}`}>
                <img src={tactic.imageUrl} className="gallery__img" alt={tactic.name} />
              </Link>
              <figcaption>
                <Link to={`/${map.name}/${tactic.name.replace(/ /g, '-')}`}>{tactic.name}</Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OverpassPage;
