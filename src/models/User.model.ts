import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    fullName: string;
    rollNumber: string;
    email: string;
    branch: string;
    course: string;
    phoneNumber: string;
    yog: string;
}

const userSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        rollNumber: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        branch: {
            type: String,
            required: true
        },
        course: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        yog: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);

