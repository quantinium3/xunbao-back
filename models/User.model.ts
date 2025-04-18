import mongoose, { Document, Schema } from "mongoose";

// Interface
export interface IUser extends Document {
  fullName: string;
  rollNumber: number;
  email: string;
  branch: string;
  course: string;
  phoneNumber: number;
  yog: number;
  password: string;
}

// Schema
const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true },
    rollNumber: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    branch: { type: String, required: true },
    course: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    yog: { type: Number, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

// ✅ Default export
export default mongoose.model<IUser>("User", userSchema);
