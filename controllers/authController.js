const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Token = require('../models/tokenModel');

const generateAccessToken = (userId, deviceId, role) => {
    const payload = { userId, deviceId, role };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (userId, deviceId) => {
    const payload = { userId, deviceId };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this name already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword , role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password, deviceId } = req.body;

        if (!username || !password || !deviceId) {
            return res.status(400).json({ error: 'Please enter name, password, and device ID' });
        }

        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid uname or password' });
        }

        await Token.deleteMany({ userId: user._id, deviceId, role: user.role });

        const accessToken = generateAccessToken(user._id, deviceId, user.role);
        const refreshToken = generateRefreshToken(user._id, deviceId, user.role);

        await Token.create({ userId: user._id, token: accessToken, deviceId, role: user.role });

        res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const logoutUser = async (req, res) => {
    const { userId, deviceId } = req.body;
    await Token.deleteOne({ userId, deviceId });
    res.json({ message: 'Logged out successfully' });
};

const refreshAccessToken = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ error: 'Refresh token is required' });

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(401).json({ error: 'Invalid refresh token' });

        const accessToken = generateAccessToken(user._id, decoded.deviceId);
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(403).json({ error: 'Invalid refresh token' });
    }
};

module.exports = { registerUser, loginUser, logoutUser, refreshAccessToken };