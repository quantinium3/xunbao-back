import { Router } from "express";
import { submitAnswer } from "../controllers/submit.controller";

const router = Router();

router.post("/:userId", submitAnswer);

export default router;
