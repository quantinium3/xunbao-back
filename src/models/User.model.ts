import mongoose, { Document, Schema } from "mongoose";
import Question from "./question.model";

export interface IUser extends Document {
    userId: string;
    username: string;
    rollNumber: string;
    email: string;
    branch: string;
    course: string;
    phoneNumber: string;
    yog: string;
    score: number;
    questions: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export const assignQuestions = async (user: IUser): Promise<void> => {
    const questions = await Question.find({}, 'questionId');

    if (!questions || questions.length === 0) {
        throw new Error("No questions found in the database");
    }

    const questionIds = questions.map(q => q.questionId);
    const randomizedQuestionIds = questionIds.sort(() => Math.random() - 0.5);

    console.log("Assigned Question IDs:", randomizedQuestionIds);
    user.questions = randomizedQuestionIds;
};

const userSchema = new Schema<IUser>(
    {
        userId: {
            type: String,
            required: [true, "User ID is required"],
            trim: true,
            unique: true,
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
        },
        rollNumber: {
            type: String,
            required: [true, "Roll number is required"],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        branch: {
            type: String,
            required: [true, "Branch is required"],
        },
        course: {
            type: String,
            required: [true, "Course is required"],
        },
        phoneNumber: {
            type: String,
            required: [true, "Phone number is required"],
            validate: {
                validator: (phone: string) => {
                    return /^[0-9]{10}$/.test(phone);
                },
                message: "Please provide a valid 10-digit phone number",
            },
            unique: true,
        },
        yog: {
            type: String,
            required: [true, "Year of graduation is required"],
        },
        score: {
            type: Number,
            default: 0,
        },
        questions: [String],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.index({ userId: 1, rollNumber: 1, email: 1 });
export default mongoose.model<IUser>("User", userSchema);
