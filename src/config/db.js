import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
      const uri = "mongodb+srv://rcs2019:Ghetto313@cluster0.rjvtvqf.mongodb.net/Cluster0"; 
      await mongoose.connect(uri);
      console.log('MongoDB Connected...');
    } catch (err) {
      console.error('MongoDB connection error: ', err.message);
      process.exit(1);
    }
};
