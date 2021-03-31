const filmModel = require("../models/film-model");
const authModel = require("../models/auth");
const orderModel = require("../models/order");
const actorModel = require("../models/actor-model")

exports.getFilmClient = (req, res) => {
  filmModel
    .find()
    .then((films) => {
      // console.log(films);
      res.status(200).json({
        films: films,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getFilmClientById = async (req, res, next) => {
  const id_phim = req.params.id_phim_client;
  const id = req.userId;

  try {
    const film = await filmModel
      .findById(id_phim)
      .populate("producers.producerId")
      .populate("actors.actorId")
      .populate("directors.directorId")
      .populate("types.typeId");

    let daMuaPhimHayChua = false;
    if (id) {
      const user = await authModel.findById(id);
      // console.log(user.purchasedFilms.toString());
      daMuaPhimHayChua = user.purchasedFilms.find(
        (idPhim) => idPhim.toString() === id_phim.toString()
      );
     
    }

    const responseFilm = { ...film._doc };
    // const responseActors = { ...film._doc.actors };
    // console.log(responseActors)
    // nếu phim chưa mua xóa url phim và trả data về
    if (!daMuaPhimHayChua) {
      delete responseFilm.urlFilm;
      res.json({ films: responseFilm });
    } // nếu phim đã mua sẽ đi check 2 trường hợp
    else if (daMuaPhimHayChua) {
      const user = await authModel.findById(id);
      const today = new Date().toISOString();
      // const today = Date.now();
      //vào db đơn hàng tìm user và đúng id phim trên params
      const orderIdList = await orderModel.findOne({
        userId: id,
        "films.filmId": id_phim.toString(),
      });

      // console.log(orderIdList);
      // console.log("id phim " + daMuaPhimHayChua);
      // console.log("id user " + id);

      id_don_hang = orderIdList._id;
      console.log("id đơn hàng " + id_don_hang);

      const arraypurchase = await orderModel.findById(id_don_hang);
      // sau khi tìm được đơn hàng sẽ xét ngày hết hạn so với ngày hôm nay là today
      console.log(arraypurchase);
      // nếu mà ngày hết hạn lớn hơn ngày hôm nay thì phim đó còn hạn sử dụng
      if (arraypurchase.expireDate.toISOString() > today) {
        res.json({ films: responseFilm });
      
        console.log("còn hạn sử dụng");
      } // nếu phim đó có ngày hết hạn nhỏ hơn ngày hiện tại thì hết hạn sử dụng
      // sau đó sẽ xóa urlphim và idphim trong purchasedfilm trong db của user để user có thể mua lại
      else if (arraypurchase.expireDate.toISOString() < today) {
        user.purchasedFilms = user.purchasedFilms.filter(function (idphim_xoa) {
          return idphim_xoa != daMuaPhimHayChua.toString();
        });
        console.log(user);
        await user.save();

        console.log("hết hạn sử dụng");
        delete responseFilm.urlFilm;
        res.json({ films: responseFilm });
      }
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.purchaseFilms = async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.userId);

  const { filmsList } = req.body;
  const id = req.userId;

  try {
    if (!id) {
      const err = new Error("Bạn chưa đăng nhập");
      err.statusCode = 401;
      return next(err);
    }

    // tìm user ... rồi .purchasedFilms
    const user = await authModel.findById(id);
    console.log(user.purchasedFilms);

    // phim có thể mua -> tìm trong filmsList khác với phim đã mua mới được mua
    const canPurchasedFilms = filmsList.filter(
      (film) => !user.purchasedFilms.includes(film)
    );
    console.log(canPurchasedFilms);

    // lấy thông tin giá của phim trong db
    const films = await filmModel.find(
      { _id: { $in: canPurchasedFilms } },
      "price"
    );
    console.log(films);

    let totalPrice = 0;

    films.forEach((film) => {
      totalPrice += film.price;
    });

    console.log(totalPrice);

    if (totalPrice <= user.balance) {
      user.balance -= totalPrice;
      user.purchasedFilms.push(...canPurchasedFilms);
      await user.save();

      // return res.json()
      const filmsSaveToDb = films.map((film) => {
        return { filmId: film._id, price: film.price };
      });
      const order = new orderModel({ userId: user._id, films: filmsSaveToDb });

      await order.save();
    } else {
      console.log("khong the thanh toan");
      // next(err) new Err 422
    }
    res.json({ message: "Thanh toán thành công", newBalance: user.balance });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getFilmClientActorsById = async (req, res, next) => {
  const id_phim = req.params.id_phim_client;
  const id = req.userId;

  try {
    const film = await filmModel
      .findById(id_phim)
      .populate("actors.actorId")
     
        const responseActors = { ...film._doc.actors };
        console.log(responseActors);
      //   responseActors = responseActors.map((actor)=>{
      //     return { actorId: actor}
      //   })
      // console.log(responseActors);
      res.json({ actors: responseActors });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
