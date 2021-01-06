const AuthModel = require("../models/auth");
const md5 = require("md5");
const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const email = await AuthModel.findOne({ email });

    if (!email) {
      const error = new Error("This email doesn't exist");
      error.statusCode = 401;
      throw error;
    }
    const isAuth = bcrypt.compareSync(password, email.password);
    if (isAuth) {
      const resData = jwt.sign(
        {
          email: user.email,
        },
        process.env.JWT_KEY,
        { expireIn: "1d" }
      );
      res.status(200).json(resData);
    } else {
      const error = new Error("sai mật khẩu");
      error.statusCode = 401;
      throw error;
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postSignup = async (req, res, next) => {
  console.log(req.body);
  const UserData = { ...req.body };

  const result = validationResult(req);

  if (!result.isEmpty()) {
    const error = new Error("Validate Failed");
    error.statusCode = 422;
    return next(error);
    // console.log(result.array());
    // res.status(422).json({ error: result.array() });
  }
  try{
  const hassedPass = bcrypt.hashSync(UserData.password, 12);
  UserData.password = hassedPass;
  const newUser = new User(UserData);
  const result = await newUser
    .save()
      console.log(result);
      // newEmail = AuthModel.find({},'email');
      res.status(201).json({
        message: "đăng ký thành công ",
      });
    
     } catch(err) {
      console.log(err);
      next(err);
      }
    

  // res.status(201).json("created");
  // .then(() => {
  //   res.json("dang ky thanh cong");
  // })
  // .catch((err) => {
  //   console.log(err);
  //   res.json("sai");
  // });
};
