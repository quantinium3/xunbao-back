import XunUser from "../models/xunbaoUser.model";

export const getLeaderBoard = async (req, res, next) => {
    try {
        const users = await XunUser.find()
            .sort({ score: -1 })
            .select('userId username score')
            .lean(); 

        if (!users || users.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No users found for leaderboard'
            });
        }

        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            userId: user.userId,
            username: user.username,
            score: user.score || 0
        }));

        return res.status(200).json({
            status: 'success',
            results: leaderboard.length,
            data: leaderboard
        });
    } catch (error: any) {
        console.error('Error fetching leaderboard:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong while generating leaderboard'
        });
    }
};
