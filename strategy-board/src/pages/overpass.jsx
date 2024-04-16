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
  const tactics = [
    { name: 'Smoke Execution', imageUrl: '/images/tactic-smoke.webp' },
    { name: 'Flash Entry', imageUrl: '/images/tactic-flash.webp' },
    { name: 'Molotov Strategy', imageUrl: '/images/tactic-molotov.webp' },
];

    const [droppedItems, setDroppedItems] = useState([]);
  
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
  
      const x = event.clientX + 300 - rect.left - dragImageWidth / 2;
      const y = event.clientY - rect.top - dragImageHeight / 2;
  
      //check if existing 
      const existingItemIndex = droppedItems.findIndex((di) => di.id === item.id);
      if (existingItemIndex !== -1) {
          //update position of an existing item
          const updatedItems = [...droppedItems];
          updatedItems[existingItemIndex] = { ...item, x, y };
          setDroppedItems(updatedItems);
      } else {
          //add a new item
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
                    draggable
                    onDragStart={(event) => handleDragStart(event, item, true)}
                    style={{ position: 'absolute', left: `${item.x}px`, top: `${item.y}px`, width: '50px' }}
                    className="dropped-item"
                  />
                ))}
          <div className="map-headers">
            <Link to="/clear"><h2>Clear</h2></Link>
            <Link to="/overpass"><h3>Overpass</h3></Link>
            <Link to="/mirage"><h3>Mirage</h3></Link>
            <Link to="/dust2"><h3>Dust 2</h3></Link>
            <Link to="/inferno"><h3>Inferno</h3></Link>
            <Link to="/nuke"><h3>Nuke</h3></Link>
            <Link to="/train"><h3>Train</h3></Link>
          </div>
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
                    {tactics.map((tactic, index) => (
                        <figure key={index} className={`gallery__item gallery__item--${index + 1}`}>
                            <Link to={`/tactics/${tactic.name.toLowerCase().replace(/ /g, '-')}`}>
                                <img src={tactic.imageUrl} className="gallery__img" alt={tactic.name} />
                            </Link>
                            <figcaption>
                                <Link to={`/tactics/${tactic.name.toLowerCase().replace(/ /g, '-')}`}>{tactic.name}</Link>
                            </figcaption>
                        </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OverpassPage;
