import { Router } from "express";
const router = Router();

router.get("/getTimer", getTimer);
router.patch("/startTimer", startTimer);

export default router;
