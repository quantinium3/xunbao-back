import { Router } from "express";
import { getQuestions } from "../controllers/questions.controller";

const router = Router();
router.route('/:userId').get(getQuestions)

export default router;
