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
    const objectToTransfer = { ...item };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(objectToTransfer));
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('application/reactflow');
    const item = JSON.parse(data);
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

  const saveStrategy = async () => {
    try {
      const response = await axios.post('https://cs-strategy-board-0b3c449c0c46.herokuapp.com/strategies', {
        mapId: map.id,
        items: droppedItems,
      });
      alert('Strategy saved successfully!');
      navigate('/strategies');
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
            <img src={map.imageUrl} alt={map.name} />
            {droppedItems.map((item) => (
              <img key={item.id} src={item.imageUrl} alt={item.name} draggable
                style={{ position: 'absolute', left: item.x, top: item.y, width: '50px' }} />
            ))}
          </div>
        </div>
        <button onClick={saveStrategy}>Save Strategy</button>
      </div>
    </div>
  );
}

export default OverpassPage;
