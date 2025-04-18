// src/index.ts
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();
app.use(express.json());

// Mount routes
app.use("/api/users", userRoutes); // <-- All routes in userRoutes are now prefixed with /api/users

connectDB().then(() => {
  const port = Number(process.env.PORT) || 8000;
  app.listen(port, () => {
    console.log(`⚙️ Server is running at PORT: ${port}`);
  });
});
