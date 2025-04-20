import mongoose from "mongoose";

const SubmitSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "XunUser",
            required: [true, "UserId is required"],
        },
        questionId: {
            type: mongoose.Schema.ObjectId,
            ref: "Question",
            required: [true, "Question Id is required"],
        },
        submittedAnswer: {
            type: String,
            required: [true, "Answer is required"],
        },
        isAnswered: {
            type: String,
            required: [true, "isAnswered is required"]
        },
        isCorrect: {
            type: Boolean
        },
        points: {
            type: Number,
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
        timestamps: true
    }
)

export const Submit = mongoose.model("Submit", SubmitSchema)
