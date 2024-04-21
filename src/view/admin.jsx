import React, { useState } from 'react';
import './signup.css';

function AdminPage() {
    const [tactic, setTactic] = useState({
        mapName: '',
        name: '',
        description: '',
        imageUrl: '',
        videoUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTactic(prevTactic => ({
            ...prevTactic,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting Tactic:', tactic);
        //api
    };

    return (
        <div>
            <h1>Submit New Map Tactic</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Map Name:</label>
                    <input
                        type="text"
                        name="mapName"
                        value={tactic.mapName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Tactic Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={tactic.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={tactic.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={tactic.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Video URL (optional):</label>
                    <input
                        type="url"
                        name="videoUrl"
                        value={tactic.videoUrl}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit Tactic</button>
            </form>
        </div>
    );
}

export default AdminPage;
