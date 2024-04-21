import mongoose from 'mongoose';

const strategySchema = new mongoose.Schema({
    mapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Map' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tactics: [{ name: String, imageUrl: String, description: String }],
    createdAt: { type: Date, default: Date.now }
});

const Strategy = mongoose.model('Strategy', strategySchema);
export default Strategy;