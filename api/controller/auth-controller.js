const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const { validationResult } = require("express-validator");

const AuthModel = require("../models/auth");
const Cash = require("../models/cash");
const Order = require("../models/order");
const Comments = require("../models/comment-model");

const secretkey = "akjhfwjsefkasecvybeoaljfalkwjf20358128957";

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
    return next(error);
  }

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
            // newUser:
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

  // res.status(201).json("created");
  // .then(() => {
  //   res.json("dang ky thanh cong");
  // })
  // .catch((err) => {
  //   console.log(err);
  //   res.json("sai");
  // });
};

exports.autoLogin = async (req, res, next) => {
   console.log(req.userId);
  const id = req.userId;
  try {
    const user = await AuthModel.findById(id, "name email balance");

    res.json({ name: user.name, email: user.email, balance: user.balance });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.createCash = async (req, res, next) => {
  setTimeout(async () => {
    if (!req.userId) {
      const err = new Error("Chưa đăng nhập tài khoản!");
      err.statusCode = 401;
      return next(err);
    }

    const cashData = {
      serial: Math.random().toString().replace("0.", ""),
      code: v4(),
      money: Math.round(Math.random() * 10) * 100000,
    };

    try {
      const cash = new Cash(cashData);
      const result = await cash.save();

      res.status(201).json(result);
    } catch (err) {
      console.log("create cash ", err);
      next(err);
    }
  }, 2000);
};

exports.postCash = async (req, res, next) => {
  setTimeout(async () => {
    if (!req.userId) {
      const err = new Error("Chưa đăng nhập!");
      err.statusCode = 401;
      return next(err);
    }
    const { serial, code } = req.body;
    const id = req.userId;

    try {
      const cash = await Cash.findOne({ serial: serial, code: code });

      if (!cash) {
        const err = new Error("Thẻ không hợp lệ!");
        err.statusCode = 404;
        return next(err);
      }

      if (cash.activatedBy) {
        const err = new Error("Thẻ đã có người sử dụng!");
        err.statusCode = 422;
        return next(err);
      }

      const user = await AuthModel.findById(id);
      user.balance += cash.money;
      await user.save();

      cash.activatedBy = user;
      await cash.save();

      res.status(200).json({
        message: `Nạp thẻ cho tài khoản ${user.email} ${cash.money}VNĐ thành công`,
        newBalance: user.balance,
      });
    } catch (err) {
      console.log(err);
    }
  }, 2000);
};

exports.getOrdersByUserId = async (req, res, next) => {
  if (!req.userId) {
    // new Err next(err);
    const err = new Error("Chưa đăng nhập!");
    err.statusCode = 401;
    next(err);
  }

  const id = req.userId;

  try {
    const orders = await Order.find({ userId: id }).populate("films.filmId");

    res.json({ orders: orders });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getProfileInfo = async (req, res, next) => {
  if (!req.userId) {
    // new Err next(err);

    const error = new Error("Chưa đăng nhâp!");
    error.statusCode = 401;
    next(err);
  }

  try {
    const id = req.userId;

    const user = await AuthModel.findById(id, "-password").populate(
      "purchasedFilms",
      "-urlFilm"
    );

    res.json({ user: user });
  } catch (err) {
    next(err);
  }
};

// exports.updateProfile = async (req, res, next) => {
//   const id = req.userId;
//   const userData = req.body;

//   try {
//     const user = await AuthModel.findByIdAndUpdate(id, { $set: userData });

//     res.json({ user: user });
//   }
//   catch(err){
//     next(err);
//   }
// };



exports.updateProfile = (req, res) => {
  const id = req.body._id;
  const userdata = req.body
  
  console.log(id)

  AuthModel.findByIdAndUpdate(id, { $set:userdata })
    .then((result) => {
      res.json({
        error: false,
        message: "đã update thông tin",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        message: "error",
      });
    });
};
exports.postComment = async (req, res, next) => {
  const idPhim = req.params.id_phim;
  const content = req.body.content;
  const userId = req.userId;
  // console.log(idPhim);
  // console.log(content);
  // console.log(userId);

  try {
    const comments = new Comments({
      userId: userId,
      content: content,
      filmId: idPhim,
    });
    const result = await comments.save();
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.getComment = async (req, res, next) => {
  const idPhim = req.params.id_phim_client;

  try {
    const content = await Comments.find({ filmId: idPhim })
      .populate("userId", "name")
      .sort({ commentDate: -1 });

    // const responseComment = { ...content._doc };
    res.json({ content: content });
    console.log(content);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.deleteComment = async (req, res, next) => {

}