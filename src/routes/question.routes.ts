import { Router } from "express";
import { addQuestions, getQuestionById, getAllQuestions, getAllQuestionIds, getQuestionsByUserId} from "../controllers/question.controller";

const router = Router();

router.get('/', getAllQuestions);
router.get('/ids', getAllQuestionIds);
router.get('/user/:userId', getQuestionsByUserId);
router.get('/:questionId', getQuestionById);
router.post('/', addQuestions);

export default router;
