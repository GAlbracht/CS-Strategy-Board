const jwt = require('jsonwebtoken');  
const User = require('../models/userSchema');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Auth token missing' });
    }
    try {
        const decoded = jwt.verify(token, 'chiken');
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid Token' });
    }
};

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');  // Use env variable for YOUR_SECRET_KEY
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

module.exports = authMiddleware;