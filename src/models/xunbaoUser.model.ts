import mongoose, { Schema, Document, Model } from "mongoose";
import Question from "./question.model";

export interface IXunUser extends Document {
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

interface IXunUserModel extends Model<IXunUser> {
}


export const assignQuestions = async (user: IXunUser): Promise<void> => {
    const questions = await Question.find({}, 'questionId');

    if (!questions || questions.length === 0) {
        throw new Error("No questions found in the database");
    }

    const questionIds = questions.map(q => q.questionId);
    const randomizedQuestionIds = questionIds.sort(() => Math.random() - 0.5);

    console.log("Assigned Question IDs:", randomizedQuestionIds);
    user.questions = randomizedQuestionIds;
};

const xunUserSchema = new Schema<IXunUser>(
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
        score: {
            type: Number,
            default: 0,
        },
        yog: {
            type: String,
            required: [true, "Yog is required"],
        },
        questions: [String]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

xunUserSchema.index({ userId: 1, rollNumber: 1, email: 1 });

const XunUser: IXunUserModel = mongoose.model<IXunUser, IXunUserModel>("XunUser", xunUserSchema);

export default XunUser;

// 20 question 
// ui optimization
//
