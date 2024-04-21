import mongoose from 'mongoose';

const mapSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String }
});

const Map = mongoose.model('Map', mapSchema);
export default Map;