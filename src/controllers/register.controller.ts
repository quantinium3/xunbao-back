import { type Request, type Response } from "express";
import User from "../models/User.model";
import asyncHandler from "../utils/asyncHandler";

interface RegisterUserBody {
    fullName: string;
    rollNumber: string;
    email: string;
    branch: string;
    course: string;
    phoneNumber: string;
    yog: string;
}

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { fullName, rollNumber, email, branch, course, phoneNumber, yog } =
        req.body as RegisterUserBody;

    if (!fullName || !rollNumber || !email || !branch || !course || !phoneNumber || !yog) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        res.status(400).json({ message: "Invalid email format" });
        return;
    }

    const existingUser = await User.findOne({ $or: [{ email }, { rollNumber }] });
    if (existingUser) {
        res.status(409).json({
            message: "User already exists",
            conflicts: {
                email: existingUser.email === email,
                rollNumber: existingUser.rollNumber === rollNumber,
            },
        });
        return;
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
            rollNumber,
        },
    });
});
