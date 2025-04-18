import { Request, Response } from "express";
import User from "../models/User.model";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, rollNumber, email, branch, course, phoneNumber, yog, password } = req.body;

    if (![fullName, rollNumber, email, branch, course, phoneNumber, yog, password].every(Boolean)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { rollNumber }] });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email or roll number already exists" });
    }

    const newUser = new User({
      fullName,
      rollNumber,
      email,
      branch,
      course,
      phoneNumber,
      yog,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
