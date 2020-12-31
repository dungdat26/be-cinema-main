const AuthModel = require("../models/auth");

const { validationResult } = require("express-validator");

exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Auth.postLogin(email, password).then((result) => {
    const user = result[0];

    console.log(user);

    if (user.length) {
      res.json({ name: user[0].name });
    } else {
      res.json("dn that bai");
    }
  });
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
  const newUser = new AuthModel(UserData);

  newUser
  .save()
  .then((result) => {
    console.log(result);
    // newEmail = AuthModel.find({},'email');
      res.status(201).json({
        message: "receive",
      });
  })
  .catch((err) => {
    console.log(err);

    res.status(500).json({
      error: "have a problem",
    });
  });
  
  // res.status(201).json("created");
  // .then(() => {
  //   res.json("dang ky thanh cong");
  // })
  // .catch((err) => {
  //   console.log(err);
  //   res.json("sai");
  // });
};
