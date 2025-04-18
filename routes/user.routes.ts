// src/routes/user.routes.ts
import { Router } from "express";
import { registerUser } from "../controllers/register.controller";

const router = Router();

router.post("/register", registerUser);

export default router; // ✅ this is the missing piece
