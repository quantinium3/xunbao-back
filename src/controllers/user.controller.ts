import XunUser, { assignQuestions } from '../models/xunbaoUser.model';

export const createUser = async (req, res) => {
    try {
        const {
            userId,
            username,
            rollNumber,
            email,
            branch,
            course,
            phoneNumber,
            yog
        } = req.body;

        const user = new XunUser({
            userId,
            username,
            rollNumber,
            email,
            branch,
            course,
            phoneNumber,
            yog,
            questions: []
        });

        await assignQuestions(user);
        await user.save();

        return res.status(201).json({
            status: 'success',
            data: user
        });
    } catch (error: any) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong while creating the user.'
        });
    }
};

export const getUserData = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid user ID'
            });
        }

        const user = await XunUser.findOne({ userId });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong while fetching user data.'
        });
    }
};
