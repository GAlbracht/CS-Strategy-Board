import React,{useState, useRef} from 'react';
import { Link} from 'react-router-dom';
import './Overpass.css'; 

function OverpassPage() {
  const dropZoneRef = useRef(null);
  const galleryImages = Array.from({ length: 6 }, (_, i) => i + 1); //creates array [1, 2, 3, 4, 5, 6]

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
  

    const [droppedItems, setDroppedItems] = useState([]);
  
    const handleDragStart = (event, item) => {
      event.dataTransfer.setData('application/reactflow', JSON.stringify(item));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    const handleDrop = (event) => {
      event.preventDefault();
      const item = JSON.parse(event.dataTransfer.getData('application/reactflow'));
    
      const rect = dropZoneRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left; //x position
      const y = event.clientY - rect.top;  //y position
    
      setDroppedItems((currentItems) => [...currentItems, { ...item, x, y, id: generateId() }]);
    };
    
  
    const handleDragOver = (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    };
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

      <div className="container">
        <div className="map">

          <div
                className="drop-zone"
                ref={dropZoneRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <img src="images/Cs2_overpass_radar.webp" alt="Overpass" />
                {droppedItems.map((item) => (
                  <img 
                    key={item.id} 
                    src={item.imageUrl} 
                    alt={item.name} 
                    style={{ position: 'absolute', left: `${item.x}px`, top: `${item.y}px`, width: '50px' }} // Example size, adjust as needed
                    className="dropped-item"
                  />
                ))}

        </div>
            



          <div className="map-headers">
            <Link to="/clear"><h2>Clear</h2></Link>
            <Link to="/overpass"><h2>Overpass</h2></Link>
            <Link to="/mirage"><h3>Mirage</h3></Link>
            <Link to="/dust2"><h3>Dust 2</h3></Link>
            <Link to="/inferno"><h3>Inferno</h3></Link>
            <Link to="/nuke"><h3>Nuke</h3></Link>
            <Link to="/train"><h3>Train</h3></Link>
          </div>


          
          <ul>
              <div className="items-list">
                  {items.map((item) => (
                      <img
                          key={item.id}
                          src={item.imageUrl}
                          alt={item.name}
                          draggable
                          onDragStart={(event) => handleDragStart(event, item)}
                          className="draggable-item"
                      />
                  ))}
              </div>
          </ul>
        </div>

        <div className="gallery">
          {galleryImages.map(number => (
            <figure key={number} className={`gallery__item gallery__item--${number}`}>
              <a href="#"><img src="images/Cs2_overpass_radar.webp" className="gallery__img" alt={`Image ${number}`} /></a>
              <figcaption><a href="#">Image {number}</a></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OverpassPage;
