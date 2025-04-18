import User from "../models/userModel"
import ApiError from "../utils/apiError"
import asyncHandler from "../utils/asyncHandler"

export const getQuestions = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ userId: req.params.userId })

    if (!user) {
        return next(new ApiError(404, "user not found"))
    }

    const questions = getQuestionsForUser(user)
    if(questions)
})

const getQuestionsForUser = (user: User): => {
    
}
