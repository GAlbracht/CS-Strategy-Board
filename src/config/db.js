import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  

export const connectDB = async () => {
    try {
      const uri = process.env.MONGO_URI; 
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('MongoDB Connected...');
    } catch (err) {
      console.error('MongoDB connection error: ', err.message);
      process.exit(1);
    }
};