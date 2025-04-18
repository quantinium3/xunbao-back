import express from 'express';
import {
  addQuestion,
  getQuestionById,
  getAllQuestions,
  submitScore,
  getQuestionsByDomain,
} from "../controllers/questionController.js";   

const router = express.Router();

router.post('/', addQuestion);
router.get('/:id', getQuestionById);
router.get('/', getAllQuestions); 
router.get("/domain/:domain", getQuestionsByDomain);
router.post("/submit", submitScore);

export default router;
