import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
      const uri = "MONGO_URI"; 
      await mongoose.connect(uri);
      console.log('MongoDB Connected...');
    } catch (err) {
      console.error('MongoDB connection error: ', err.message);
      process.exit(1);
    }
};
