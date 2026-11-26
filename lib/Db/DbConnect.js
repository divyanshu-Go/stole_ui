// lib/Db/DbConnect.js
import mongoose from "mongoose";

const globalForMongoose = globalThis;

if (!globalForMongoose.mongooseConnection) {
  globalForMongoose.mongooseConnection = {
    connection: null,
    promise: null,
  };
}

const cached = globalForMongoose.mongooseConnection;

const DbConnect = async () => {
  if (cached.connection) {
    return cached.connection;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(databaseUrl, {
      dbName: "StoleUi",
    });
  }

  try {
    cached.connection = await cached.promise;
    return cached.connection;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
};

export default DbConnect;
