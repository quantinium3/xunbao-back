import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

type MongoDBUri = string;

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI || !process.env.DBPASSWORD) {
      throw new Error("MongoDB connection credentials are missing in environment variables");
    }

    const uri: MongoDBUri = process.env.MONGODB_URI.replace(
      "<db_password>", 
      encodeURIComponent(process.env.DBPASSWORD)
    );

    const options = {
      autoIndex: true,
      maxPoolSize: 10, 
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000, 
    };

    const connection = await mongoose.connect(uri, options);

    console.log(`\nMongoDB connected successfully`);
    console.log(`   DB Host: ${connection.connection.host}`);
    console.log(`   DB Name: ${connection.connection.name}`);

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("Mongoose disconnected from DB");
    });

  } catch (error) {
    console.error("\nMongoDB connection FAILED");
    console.error(`Error: ${(error as Error).message}`);
    
    process.exit(1);
  }
};

export default connectDB;
