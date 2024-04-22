import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mapSchema = new Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String },
    strategies: [{ type: Schema.Types.ObjectId, ref: 'Strategy'}]
});

const Map = mongoose.model('Map', mapSchema);
export default Map;