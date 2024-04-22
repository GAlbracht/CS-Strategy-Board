import express from 'express';
import Map from '../model/mapSchema.js';

const router = express.Router();

// Get all maps
router.get('/maps', async (req, res) => {
    try {
        const maps = await Map.find({});
        res.send(maps);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get a single map by ID
router.get('/maps/:id', async (req, res) => {
    try {
        const map = await Map.findById(req.params.id).populate('strategies');
        if (!map) {
            return res.status(404).send('Map not found');
        }
        res.send(map);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get a single map by its name
router.get('/maps/name/:name', async (req, res) => {
    try {
        const map = await Map.findOne({ name: req.params.name });
        if (!map) {
            return res.status(404).send('Map not found');
        }
        res.send(map);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update a map by ID
router.put('/maps/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body; 

    try {
        const map = await Map.findById(id);
        if (!map) {
            return res.status(404).send('Map not found');
        }

        // Update the map with new data
        Object.keys(updateData).forEach(key => {
            map[key] = updateData[key];
        });

        await map.save();
        res.send(map);
    } catch (error) {
        res.status(500).send({ message: 'Failed to update the map', error: error.toString() });
    }
});

// Post a map
router.post('/maps', async (req, res) => {
    try {
        const newMap = new Map({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            description: req.body.description
        });
        await newMap.save();
        res.status(201).send(newMap);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export default router;
