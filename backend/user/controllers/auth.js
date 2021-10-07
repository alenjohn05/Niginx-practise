const User = require("../models/User");

const ErrorResponse = require("../utils/errorResponse");

//REGISTER

exports.register =async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password,
      });
      sentToken(user, 201, res);
    } catch (error) {
      return next(new ErrorResponse("User Already Registered with same username and email", 402));
    }
  };

//LOGIN

exports.login =
  ("/",
  async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("Please provide the password", 402));
    }

    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorResponse("invalid Credentials", 404));
      }
      const isMatch = await user.matchPasswords(password);
      if (!isMatch) {
        return next(new ErrorResponse("invalid Credentials", 404));
      }

      sentToken(user, 201, res);
    } catch (error) {
      next(error);
    }
  });


//SentToken Response
const sentToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(200).json({
    success: true,
    jwt_token: token,
  });
};
