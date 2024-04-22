import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Overpass.css';
import { getMapId } from '../utils/mapIds';

function OverpassPage() {
  const { mapName } = useParams();
  const dropZoneRef = useRef(null);
  const [map, setMap] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [strategies, setStrategies] = useState([]);

  const grenadeItems = [
    { id: 'smoke', name: 'Smoke', imageUrl: '/images/smoke.png' },
    { id: 'molotov', name: 'Molotov', imageUrl: '/images/molotov.webp' },
    { id: 'flashbang', name: 'Flashbang', imageUrl: '/images/flashbang.webp' },
    { id: 'grenade', name: 'HE Grenade', imageUrl: '/images/grenade.webp' }
  ];

  useEffect(() => {
    const mapId = getMapId(mapName);
    if (mapId) {
      fetchMapData(mapId);
      fetchStrategies(mapId);
    }
  }, [mapName]);

  const fetchMapData = async (id) => {
    try {
      const response = await axios.get(`https://cs-strategy-board-0b3c449c0c46.herokuapp.com/maps/${id}`);
      setMap(response.data);
    } catch (error) {
      console.error('Error fetching map:', error);
    }
  };

  const fetchStrategies = async (id) => {
    try {
      const response = await axios.get(`https://cs-strategy-board-0b3c449c0c46.herokuapp.com/maps/${id}/strategies`);
      setStrategies(response.data);
    } catch (error) {
      console.error('Error fetching strategies:', error);
    }
  };

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(item));
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const item = JSON.parse(event.dataTransfer.getData('application/reactflow'));
    const rect = dropZoneRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newItem = { ...item, x, y, id: Date.now() };
    setDroppedItems(currentItems => [...currentItems, newItem]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDisplayStrategy = (strategy) => {
    setDroppedItems(strategy.tactics.map(tactic => ({
      ...tactic,
      id: Date.now() + Math.random() // Ensures a unique key for each item
    })));
  };

  const saveStrategy = async () => {
    const strategyName = prompt('Enter a name for this strategy:');
    if (!strategyName) {
      return;
    }
    try {
      await axios.post('https://cs-strategy-board-0b3c449c0c46.herokuapp.com/strategies', {
        name: strategyName,
        mapId: map._id,
        userId: '6625c05188e7ff889da17cb6',
        tactics: droppedItems.map(item => ({
          name: item.name,
          imageUrl: item.imageUrl,
          position: { x: item.x, y: item.y }
        }))
      });
      alert('Strategy saved successfully!');
      fetchStrategies(map._id);  // Refresh the strategies list
    } catch (error) {
      console.error('Failed to save strategy:', error);
      alert('Failed to save strategy');
    }
  };

  if (!map) {
    return <div>Loading map data...</div>;
  }

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
            {map && <img src={map.imageUrl} alt={map.name} style={{ width: '100%' }} />}
            {droppedItems.map((item, index) => (
              <img key={index} src={item.imageUrl} alt={item.name} draggable
                style={{ position: 'absolute', left: `${item.x}px`, top: `${item.y}px`, width: '50px' }} />
            ))}
          </div>
          <div className="grenade-items">
            {grenadeItems.map(item => (
              <img key={item.id} src={item.imageUrl} alt={item.name} draggable
                onDragStart={(event) => handleDragStart(event, item)}
                style={{ width: '50px', margin: '10px' }} />
            ))}
          </div>
        </div>
        <div className="strategies-display">
          {strategies.map((strategy, idx) => (
            <div key={idx} className="strategy-small-view" onClick={() => handleDisplayStrategy(strategy)}>
              <img src={map.imageUrl} alt={map.name} style={{ width: '100px', height: '100px' }} />
              {strategy.tactics.map((tactic, index) => (
                <img key={index} src={tactic.imageUrl} alt={tactic.name}
                  style={{
                    position: 'absolute',
                    left: `${tactic.position.x}px`,
                    top: `${tactic.position.y}px`,
                    width: '10px'
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <button onClick={saveStrategy}>Save Strategy</button>
      </div>
    </div>
  );
}

export default OverpassPage;
