import mongoose, { Schema } from "mongoose";
import { addQuestions } from "../utils/addQuestions";

const SetAnsweredEnum = ["anime", "movies", "games"] as const;
type SetAnsweredType = typeof SetAnsweredEnum[number];

interface IUser extends Document {
    userId: string;
    rollNumber: string;
    username: string;
    email: string;
    branch: string;
    course: string;
    phoneNumber: string;
    year: number;
    hasPlayed: boolean;
    setAnswered: SetAnsweredType[];
    score: number;
    questions: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, "UserId is required"],
            unique: true,
        },
        rollNumber: {
            type: String,
            required: [true, "Roll Number is required"],
        },
        username: {
            type: String,
            required: [true, "Username is required"],
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
            required: [true, "Phone Number is required"],
            match: [/^\d{10}$/, "Invalid Phone Number"]
        },
        year: {
            type: Number,
            required: [true, "Year is required"],
            min: [1, "Year must be at least 1"],
            max: [4, "Year cannot exceed 4"],
        },
        hasPlayed: {
            type: Boolean,
            default: false,
        },
        setAnswered: {
            type: [String],
            enum: {
                values: SetAnsweredEnum,
                message: `{VALUE} is not a valid setAnswered value. Must be one of: ${JSON.stringify(SetAnsweredEnum, null, 2)}`,
            },
            default: [],
        },
        score: {
            type: Number,
            default: 0,
            min: [0, "Score cannot be negative"],
        },
        questions: [String]
    }, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
)

UserSchema.pre("save", function (this: IUser, next) {
  if (!this.questions || this.questions.length === 0) {
    addQuestions(this);
  }
  next();
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
