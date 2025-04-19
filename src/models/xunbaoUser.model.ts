import mongoose, { Schema, Document, Model } from "mongoose";

export interface IXunUser extends Document {
    userId: string;
    username: string;
    rollNumber: string;
    email: string;
    branch: string;
    course: string;
    phoneNumber: string;
    yog: string;
    questions: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface IXunUserModel extends Model<IXunUser> {
}


export const assignQuestions = async (user: IXunUser): Promise<void> => {
    const res = await fetch('http://localhost:8000/api/questions/id');
    if (!res.ok) {
        console.log("Failed to fetch all questions")
    }

    const data = await res.json();

    if (!data.data?.questionIds) {
        throw new Error("Invalid response structure from question IDs API");
    }

    const questionIds: string[] = data.data.questionIds;
    const randomizedQuestionIds = questionIds.sort(() => Math.random() - 0.5);
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
            validate: {
                validator: (email: string) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                },
                message: "Please provide a valid email address",
            },
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

xunUserSchema.pre("save", async function(next) {
    if (this.questions.length === 0) {
        assignQuestions(this);
    }
    next();
});

xunUserSchema.index({ userId: 1, rollNumber: 1, email: 1 });

const XunUser: IXunUserModel = mongoose.model<IXunUser, IXunUserModel>("XunUser", xunUserSchema);

export default XunUser;
