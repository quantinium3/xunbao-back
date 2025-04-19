import { Router } from "express";
import { registerUser } from "../controllers/register.controller";
import { createUser, getUserData } from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.post('/create', createUser)
router.get('/:userId', getUserData)

export default router;
