import mongoose from 'mongoose';

const tacticItemSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    position: {
        x: Number,
        y: Number
    }
});

const strategySchema = new mongoose.Schema({
    name: { type: String, required: true },
    mapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Map', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tactics: [tacticItemSchema],
    createdAt: { type: Date, default: Date.now }
});

const Strategy = mongoose.model('Strategy', strategySchema);
export default Strategy;