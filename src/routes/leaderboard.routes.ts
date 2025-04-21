import { Router } from "express";
import { getLeaderBoard } from "../controllers/leaderboard.controller";
const router = Router();

router.get("/:userId", getLeaderBoard);

export default router;
