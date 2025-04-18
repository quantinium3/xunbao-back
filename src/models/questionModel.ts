import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";

interface IQuestion extends Document {
    questionId: string;
    text: string;
    options: string[];
    correctAnswer: string;
    category: "anime" | "movies" | "games" | "music" | "coding";
}

const CategoryEnum = ["anime", "movies", "games", "music", "sports"] as const;

const QuestionSchema = Schema<IQuestion> = new mongoose.Schema(
    {
        questionId: {
            type: String,
            required: [true, "Question ID is required"],
            unique: true,
            trim: true,
        },
        text: {
            type: String,
            required: [true, "Question text is required"],
            trim: true,
        },
        options: {
            type: [String],
            required: [true, "Options are required"],
            validate: {
                validator: (arr: string[]) => arr.length == 4,
                message: "At least two options are required",
            },
        },
        correctAnswer: {
            type: String,
            required: [true, "Correct answer is required"],
            validate: {
                validator: function(this: IQuestion, value: string) {
                    return this.options.includes(value);
                },
                message: "Correct answer must be one of the options",
            }
        }
    }, {
    timeStamp: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.correctAnswer;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
}
)

const Question = mongoose.model<IQuestion>("Question", QuestionSchema)
export default Question;
