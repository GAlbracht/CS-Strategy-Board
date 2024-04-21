import express from 'express';
import Map from '../model/mapSchema.js';

const router = express.Router();

// Get all maps
router.get('/maps', async (req, res) => {
    const maps = await Map.find({});
    res.send(maps);
});

// Get a single map by ID
router.get('/maps/:id', async (req, res) => {
    const map = await Map.findById(req.params.id);
    if (!map) {
        return res.status(404).send('Map not found');
    }
    res.send(map);
});

export default router;
