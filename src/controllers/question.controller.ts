import Question from "../models/question.model";
import XunUser from "../models/xunbaoUser.model";
import ApiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";

/* @desc  POST questions
 * @route POST /api/question
 * @access public
 */
export const addQuestions = asyncHandler(async (req, res, next) => {
    const body = req.body;

    if (!body || (Array.isArray(body) && body.length === 0)) {
        return res.status(400).json({ status: "fail", message: "Request body is empty or invalid" });
    }

    let questions;
    if (Array.isArray(body)) {
        questions = await Question.insertMany(body);
    } else {
        questions = await Question.create(body);
    }

    res.status(201).json({
        status: "success",
        data: { data: questions }
    });
});

/* @desc  Get question by ID
 * @route GET /api/question/:id
 * @access public
 */
export const getQuestionById = asyncHandler(async (req, res) => {
    const { questionId } = req.params;

    if (!questionId || typeof questionId !== 'string') {
        return res.status(400).json({
            status: "error",
            message: "Please provide a valid questionId",
        });
    }

    const question = await Question.findOne({ questionId: questionId });

    if (!question) {
        return res.status(404).json({
            status: 'error',
            message: 'Question not found'
        });
    }

    return res.status(200).json({
        status: "success",  // Changed from 'success: "success"' to 'status: "success"'
        data: {
            question  // Changed from 'data: question' to just 'question'
        }
    });
});

/* @desc  Get question by user id
 * @route GET /api/question/user/:userId
 * @access public
 */
export const getQuestionsByUserId = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    if (!userId || typeof userId !== 'string') {
        return next(new ApiError(400, 'Invalid user ID'));
    }

    const user = await XunUser.findOne({ userId });
    if (!user) {
        return next(new ApiError(404, 'User not found'));
    }

    const userQuestionIds: string[] = user.questions || [];

    const unansweredQuestions = await Question.find({
        questionId: { $in: userQuestionIds }, // Changed _id to questionId
        hasAnswered: false
    }).select('-__v -hasAnswered');

    if (unansweredQuestions.length === 0) {
        return next(new ApiError(404, 'No unanswered questions found'));
    }

    res.status(200).json({
        status: 'success',
        results: unansweredQuestions.length,
        data: {
            questions: unansweredQuestions
        }
    });
});

/* @desc  Get all question's ids
 * @route GET /api/question/ids
 * @access public
 */
export const getAllQuestionIds = asyncHandler(async (req, res) => {
    try {
        const questions = await Question.find({}, 'questionId');

        if (!questions || questions.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No questions found'
            });
        }

        const ids = questions.map(q => q.questionId.toString());

        return res.status(200).json({
            status: "success",
            data: ids
        });
    } catch (error) {
        console.error('Error fetching question IDs:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve question IDs'
        });
    }
});

/* @desc  Get all questions
 * @route GET /api/question
 * @access public
 */
export const getAllQuestions = asyncHandler(async (req, res) => {
    try {
        const question = await Question.find();

        if (!question) {
            return res.status(404).json({
                status: 'error',
                message: 'Question not found'
            });
        }
        console.log(question)

        return res.status(200).json({
            status: "success",
            data: {
                question
            }
        });
    } catch (error) {
        console.error('Error fetching question IDs:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve question IDs'
        });
    }
});
