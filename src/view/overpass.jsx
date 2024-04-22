import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Overpass.css';

function OverpassPage() {
  const { mapName } = useParams();
  const navigate = useNavigate();
  const dropZoneRef = useRef(null);
  const [map, setMap] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);

  // Define grenade items for dragging
  const grenadeItems = [
    { id: 'smoke', name: 'Smoke', imageUrl: '/images/smoke.png' },
    { id: 'molotov', name: 'Molotov', imageUrl: '/images/molotov.webp' },
    { id: 'flashbang', name: 'Flashbang', imageUrl: '/images/flashbang.webp' },
  ];

  useEffect(() => {
    if (mapName) {
      axios.get(`https://cs-strategy-board-0b3c449c0c46.herokuapp.com/maps/name/${mapName}`)
        .then(response => {
          setMap(response.data);
        })
        .catch(error => {
          console.error('Error fetching map:', error);
          alert('Failed to load map data');
        });
    }
  }, [mapName]);

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

    const newItem = { ...item, x, y, id: Date.now() }; // Use a more robust ID generation in production
    setDroppedItems(currentItems => [...currentItems, newItem]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const saveStrategy = async () => {
    if (!map || droppedItems.length === 0) {
        alert("No items to save or map not loaded");
        return;
    }

    try {
      const payload = {
        mapId: map._id, // Assuming map object has _id as fetched from the backend
        userId: 'yourUserId', // Make sure to replace with actual logic to get userId
        tactics: droppedItems.map(item => ({
          name: item.name,
          imageUrl: item.imageUrl,
          position: { x: item.x, y: item.y }
        }))
      };

      const response = await axios.post('https://cs-strategy-board-0b3c449c0c46.herokuapp.com/strategies', payload);
      alert('Strategy saved successfully!');
      navigate('/strategies'); // Assuming you have a route setup to view strategies
    } catch (error) {
      console.error('Failed to save strategy:', error);
      alert('Failed to save strategy: ' + error.response?.data?.message || error.message);
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
            <img src={map.imageUrl} alt={map.name} style={{ width: '100%' }} />
            {droppedItems.map((item) => (
              <img key={item.id} src={item.imageUrl} alt={item.name} draggable
                style={{ position: 'absolute', left: `${item.x}px`, top: `${item.y}px`, width: '50px' }} />
            ))}
          </div>
        </div>
        <div className="grenade-items">
          {grenadeItems.map(item => (
            <img key={item.id} src={item.imageUrl} alt={item.name} draggable
              onDragStart={(event) => handleDragStart(event, item)}
              style={{ width: '50px', margin: '10px' }} />
          ))}
        </div>
        <button onClick={saveStrategy}>Save Strategy</button>
      </div>
    </div>
  );
}

export default OverpassPage;
