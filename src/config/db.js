import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB Connected...');
    } catch (err) {
      console.error('MongoDB connection error: ', err.message);
      process.exit(1);
    }
};
