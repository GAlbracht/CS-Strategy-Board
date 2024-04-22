import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';  

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send('User created');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ _id: user._id }, 'your_jwt_secret');
    res.send({ token });
});

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
}); 

export default router;
