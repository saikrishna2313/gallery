import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log(`Already connected to MongoDB 🥂`);
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Successfully connected to MongoDB 🥂`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
