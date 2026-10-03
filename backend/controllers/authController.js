const User = require('../models/User');
const ApiError = require('../middleware/apiError');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new ApiError(409, 'An account with this email already exists', 'EMAIL_ALREADY_EXISTS');
    }

    const user = await User.create({ fullName, email, password });

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return next(new ApiError(409, 'An account with this email already exists', 'EMAIL_ALREADY_EXISTS'));
    }
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      throw new ApiError(401, 'Invalid email or password', 'INVALID_CREDENTIALS');
    }

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
