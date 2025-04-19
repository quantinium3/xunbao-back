import Question from "../models/question.model";
import XunUser from "../models/xunbaoUser.model";
import ApiError from "../utils/apiError";

export const submitAnswer = async (req, res, next) => {
    const { userId } = req.params;
    const { questionId, userAnswer, timeLeft } = req.body;

    if (!userId || !questionId || !userAnswer || timeLeft === undefined) {
        return next(new ApiError(400, 'Missing required parameters'));
    }

    const user = await XunUser.findOne({ userId });
    if (!user) {
        return next(new ApiError(404, 'User not found'));
    }

    const question = await Question.findOne({ questionId });
    if (!question) {
        return next(new ApiError(404, 'Question not found'));
    }

    const isAnswerCorrect = userAnswer === question.correctAnswer;

    if (isAnswerCorrect) {
        const score = (20 - timeLeft) * 10;
        user.score = (user.score || 0) + score;
        user.questions = user.questions.filter(qid => qid !== questionId);

        await user.save();

        return res.status(200).json({
            status: 'success',
            message: 'Answer submitted successfully. Score updated, question removed.',
            score: user.score,
        });
    } else {
        return res.status(400).json({
            status: 'fail',
            message: 'Incorrect answer',
        });
    }
};
