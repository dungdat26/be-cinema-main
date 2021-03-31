const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const { validationResult } = require("express-validator");

const adminModel = require("../models/administrator-model")
const secretkey = "akjhfwjsefkasecvybeoaljfalkwjf20358128957";


exports.postSignup = async (req, res, next) => {
    // console.log(req.body);
    const UserData = { ...req.body };
    const EmailCheck = req.body.email;
    const emailDB = await adminModel.findOne({ email: EmailCheck });
    // console.log(emailDB.email);
  
    //  console.log(EmailCheck);
    const result = validationResult(req);
  
    if (!result.isEmpty()) {
      const error = new Error("Validate Failed");
      error.statusCode = 422;
      return next(error);
    }
    //  console.log( UserData.email);
    //   console.log (emailDB);
  
    if (emailDB) {
      const error = new Error(" email has been used ");
      error.statusCode = 421;
      return next(error);
    }
  
    else {
      const hassedPass = bcrypt.hashSync(UserData.password, 6);
      UserData.password = hassedPass;
      const newUser = new adminModel(UserData);
      // const result = newUser;
      const match = await bcrypt.compareSync(UserData.cmpass, hassedPass);
  
      if (!match) {
        res.status(401).json({
          message: "Your confirm password not match ",
        });
      }
  
      if (match) {
        newUser
          .save()
          .then((newUser) => {
            res.status(201).json({
              name: UserData.name,
              email: UserData.email,
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
  };


  exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    // console.log(email);
    // đăng nhập lấy email user gửi lên vào db tìm
    try {
      const emailDB = await adminModel.findOne({ email });
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
        const resData = {
          userId: emailDB._id,
        };
  
        const token = jwt.sign(resData, secretkey, { expiresIn: "3d" });
  
        res.status(200).json({
          name: emailDB.name,
          email: emailDB.email,
          token: token,
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

  
exports.autoLogin = async (req, res, next) => {
    console.log(req.userId);
    const id = req.userId;
    
    try {
      const user = await adminModel.findById(id, "name email");
      console.log(user)
      res.json({ name: user.name, email: user.email });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };