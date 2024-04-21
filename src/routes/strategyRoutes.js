import express from 'express';

import Strategy from '../model/strategySchema.js'; 

const router = express.Router();

// Post a strategy
router.post('/strategies', async (req, res) => {
    const strategy = new Strategy(req.body);
    await strategy.save();
    res.status(201).send(strategy);
});

// Get strategies for a map
router.get('/maps/:mapId/strategies', async (req, res) => {
    const strategies = await Strategy.find({ mapId: req.params.mapId });
    res.send(strategies);
});

export default router;