import mongoose from 'mongoose';


const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

// Global variable for reuse (avoids re-connecting)
let isConnected = false;

const DbConnect = async () => {
  if (isConnected) {
    // console.log('➡️ Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: 'StoleUi', // optional: helps specify DB
    });

    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ Database connection failed', error);
    process.exit(1);
  }
};

export default DbConnect;
