import UserModel, { type IUser } from "../models/User.model";
import ApiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";

export const getLeaderBoard = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        return next(new ApiError(400, 'Valid userId is required'));
    }

    const topUsers = await UserModel.find()
        .select('userId fullName rollNumber email score')
        .sort({ score: -1 })
        .limit(20)
        .lean();

    if (!topUsers.length) {
        return next(new ApiError(404, 'No users found for leaderboard'));
    }

    const leaderboard = topUsers.map((user: IUser , index: number) => ({
        rank: index + 1,
        userId: user.userId,
        username: user.username,
        rollNumber: user.rollNumber,
        email: user.email,
        score: user.score || 0,
    }));

    const allUsers = await UserModel.find()
        .select('userId fullName rollNumber email score')
        .sort({ score: -1 })
        .lean();

    const userIndex = allUsers.findIndex((user) => user.userId === userId);
    if (userIndex === -1) {
        return next(new ApiError(404, `User with userId ${userId} not found`));
    }

    const userRank = userIndex + 1;
    const user = allUsers[userIndex];

    return res.status(200).json({
        status: 'success',
        results: leaderboard.length,
        data: {
            leaderboard, 
            user: {
                rank: userRank,
                userId: userId,
                fullName: user?.username,
                rollNumber: user?.rollNumber,
                email: user?.email,
                score: user?.score || 0,
            },
        },
    });
});
