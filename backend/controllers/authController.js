import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register controller  
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(409).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ msg: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Login controller 
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: 'User Not Found!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({name:user.name, email:user.email }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.json({ token, user: {name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
