import Question from "../models/question.model";
import { Submit } from "../models/submission.model";
import XunUser from "../models/xunbaoUser.model";
import ApiError from "../utils/apiError";

export const submitAnswer = async (req, res, next) => {
    const { userId } = req.params;
    const { questionId, selectedOption, timeLeft } = req.body;

    if (!userId || !questionId || !selectedOption) {
        return next(new ApiError(400, 'Missing required parameters'));
    }

    try {
        const user = await XunUser.findOne({ userId });
        if (!user) {
            return next(new ApiError(404, 'User not found'));
        }

        const question = await Question.findOne({ questionId });
        if (!question) {
            return next(new ApiError(404, 'Question not found'));
        }

        const existingSubmission = await Submit.findOne({ userId, questionId });
        if (existingSubmission) {
            return res.status(200).json({
                status: "success",
                message: "Question already answered",
            })
        }

        if (selectedOption === "Timeout") {
            await Submit.create({
                userId,
                questionId,
                submittedAnswer: selectedOption,
                isCorrect: false,
                isAnswered: true,
                points: 0,
            });

            return res.status(200).json({
                status: "success",
                message: "Answer timed out. No points awarded.",
            });
        }

        const isAnswerCorrect = selectedOption === question.correctAnswer;
        if (!isAnswerCorrect) {
            await Submit.create({
                userId,
                questionId,
                submittedAnswer: selectedOption,
                isCorrect: false,
                isAnswered: true,
                points: 0,
            })
            return res.status(200).json({
                status: 'success',
                message: 'Incorrect answer',
            });
        }

        const score = Math.max(0, timeLeft);
        user.score = (user.score || 0) + score;
        await user.save();

        await Submit.create({
            userId,
            questionId,
            submittedAnswer: selectedOption,
            isCorrect: true,
            isAnswered: true,
            points: score,
        });

        return res.status(200).json({
            status: 'success',
            message: 'Answer submitted successfully. Score updated.',
            score: user.score,
        });

    } catch (error) {
        next(error);
    }
};
