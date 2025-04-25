const User = require('../models/userModel');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password').lean();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user});
    } catch (error) {
        console.error('Error loading profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { getProfile };