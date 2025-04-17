import express from 'express';
import Participant from '../models/Participant.js';

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Participant.find()
      .sort({ score: -1, submissionTime: 1 }) 
     

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const router = express.Router();

router.get('/', getLeaderboard);

export default router;