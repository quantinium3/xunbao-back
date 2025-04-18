import { type Request, type Response } from "express";
import User from "../models/User.model";
import type { IUserRegistration } from "../types/user.types";


export const registerUser = async (
    req: Request<{}, {}, IUserRegistration>,
    res: Response
) => {
    try {
        const { fullName, rollNumber, email, branch, course, phoneNumber, yog } = req.body;

        if (!fullName || !rollNumber || !email || !branch || !course || !phoneNumber || !yog) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { rollNumber }] });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
                conflicts: {
                    email: existingUser.email === email,
                    rollNumber: existingUser.rollNumber === rollNumber
                }
            });
        }

        const newUser = new User({
            fullName,
            rollNumber,
            email,
            branch,
            course,
            phoneNumber,
            yog,
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                fullName,
                email,
                rollNumber
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};
