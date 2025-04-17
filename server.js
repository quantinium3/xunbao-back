import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import questionRoutes from './routes/questions.js';
import leaderboardRoutes from './routes/leaderboard.js';
import participantRoutes from "./routes/participant.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

 
app.use('/api/questions', questionRoutes);
app.use('/api/leaderBoard', leaderboardRoutes);
app.use('/api/participants', participantRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  })
  .catch(err => console.error(err));
