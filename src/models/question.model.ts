import mongoose, { Document, Model, Schema } from "mongoose";

export interface IQuestion extends Document {
    questionId: string;
    question: string;
    options: string[];
    correctAnswer: string;
    points: number;
    category: string;
    hasAnswered: Boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IQuestionModel extends Model<IQuestion> {
}

const QuestionSchema: Schema = new mongoose.Schema<IQuestion>(
    {
        questionId: {
            type: String,
            required: [true, "A question must have a question id"],
            unique: true,
            trim: true,
        },
        question: {
            type: String,
            required: [true, "A question must have some question text"],
            trim: true,
        },
        options: {
            type: [String],
            required: [true, "A question must have options"],
            validate: {
                validator: function(options: string[]) {
                    return options.length === 4 && new Set(options).size === 4;
                },
                message: "A question must have 4 options",
            },
        },
        correctAnswer: {
            type: String,
            required: [true, "A question must have a correct answer"],
            trim: true,
            validate: {
                validator: function(this: IQuestion, answer: string) {
                    return this.options.includes(answer);
                },
                message: "Correct answer must be one of the provided options",
            },
        },
        points: {
            type: Number,
            required: [true, "Each question must have some points"],
            min: [1, "Points must be at least 1"],
        },
        category: {
            type: String,
            required: [true, "A question must belong to a category"],
            trim: true,
        },
        hasAnswered: {
            type: Boolean,
            required: [true, "A question must be answered or not"],
            default: false,
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Question: IQuestionModel = mongoose.model<IQuestion, IQuestionModel>("Question", QuestionSchema);

export default Question;

