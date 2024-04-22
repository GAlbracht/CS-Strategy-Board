import express from 'express';
import mongoose from 'mongoose';
import Strategy from '../model/strategySchema.js'; 
import Map from '../model/mapSchema.js';

const router = express.Router();

// Create a new strategy and link it to a map
router.post('/strategies', async (req, res) => {
    console.log("Received strategy:", JSON.stringify(req.body, null, 2));
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const strategy = new Strategy(req.body);
        await strategy.save({ session });

        const map = await Map.findById(req.body.mapId).session(session);
        if (!map) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).send('Map not found');
        }
        map.strategies.push(strategy._id);
        await map.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ strategy, message: 'Strategy added and map updated successfully!' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: 'Failed to create strategy', error: error.message });
    }
});

// Get strategies for a map
router.get('/maps/:mapId/strategies', async (req, res) => {
    try {
        const strategies = await Strategy.find({ mapId: req.params.mapId }).populate('tactics');
        if (!strategies) {
            return res.status(404).send('No strategies found for this map');
        }
        res.status(200).json(strategies);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// PUT route to update an existing strategy
router.put('/strategies/:strategyId', async (req, res) => {
    const { strategyId } = req.params;
    try {
        const strategy = await Strategy.findById(strategyId);
        if (!strategy) {
            return res.status(404).send('Strategy not found');
        }

        Object.assign(strategy, req.body);
        await strategy.save();

        res.status(200).json({ strategy, message: 'Strategy updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update strategy', error: error.message });
    }
});

export default router;