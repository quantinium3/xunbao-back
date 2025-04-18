import { Router } from "express";
import { registerUser } from "../controllers/register.controller";
import type { IUserRegistration } from "../types/user.types";

const router = Router();

router.post<{}, {}, IUserRegistration>("/register", registerUser);

export default router;
