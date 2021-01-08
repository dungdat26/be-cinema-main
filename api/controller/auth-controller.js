const AuthModel = require("../models/auth");
const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // console.log(email);
  // đăng nhập lấy email user gửi lên vào db tìm
  try {
    const emailDB = await AuthModel.findOne({ email });
    // nếu không có email user gửi lên trong db trả lỗi và bắt nhập lại email
    if (!emailDB) {
      const error = new Error("This email doesn't exist");
      error.statusCode = 401;
      throw error;
    }
    const isAuth = bcrypt.compareSync(password, emailDB.password);
    console.log(password);
    // nếu tìm được email user gửi lên trong db thì trả thông báo đăng nhập thành công 
    if (isAuth) {
      res.status(201).json({
        message: "đăng nhập thành công ",
      });
    } //trường hợp đúng email nhưng sai password thì trả lỗi và báo là sai mật khẩu
     else {
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
  // console.log(req.body);
  const UserData = { ...req.body };
  const EmailCheck = req.body.email;
  const emailDB = await AuthModel.findOne({ email: EmailCheck });
  // console.log(emailDB.email);

  //  console.log(EmailCheck);
  const result = validationResult(req);

  // check form thông tin có bị trống cái nào không 
  if (!result.isEmpty()) {
    const error = new Error("Validate Failed");
    error.statusCode = 422;
    return next(error);

  }
  //  console.log( UserData.email);
  //   console.log (emailDB);


  // check xem mail đã đăng ký chưa nếu chưa trả lỗi bắt nhập mail khác 
  if (emailDB) {
    const error = new Error(" email has been used ");
    error.statusCode = 421;
    return next(error); }


  // nếu đăng ký rồi thì tiếp tục check mật khẩu và xác nhận mật khẩu lần 2 ở BE có trùng không
 else {
    const hassedPass = bcrypt.hashSync(UserData.password, 6);
    UserData.password = hassedPass;
    const newUser = new AuthModel(UserData);
    // const result = newUser;
    const match = await bcrypt.compareSync(UserData.cmpass, hassedPass);


    // nếu không trùng trả lỗi bắt người dùng nhập lại
    if (!match) {
      // const error = new Error("Your confirm password not match");
      res.status(401).json({
        message: "Your confirm password not match ",
      });
    }


    // nếu trùng thì save lên db và trả thông báo đăng ký thành công 
    if (match) {
      newUser
        .save()
        .then((newUser) => {
          // console.log(newUser);
          // newEmail = AuthModel.find({},'email');
          res.status(201).json({
            message: "đăng ký thành công ",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(401).json({
            message: "đăng ký thất bại ",
          });
        });
    }
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
