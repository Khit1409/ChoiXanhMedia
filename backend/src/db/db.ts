import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to database!");
  } catch (error) {
    console.log("Cannot connect to mongoodb: ", error);
  }
};

export default connectDB;
