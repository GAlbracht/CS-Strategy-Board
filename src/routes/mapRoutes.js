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
