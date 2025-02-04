import mongoose from 'mongoose';
import config from './index';

const { mongodbUri } = config;

const connectDB = async (): Promise<void> => {
  try {
    if (!mongodbUri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    await mongoose.connect(mongodbUri);
    console.log('Database connection successful!!!');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
};

export default connectDB;
