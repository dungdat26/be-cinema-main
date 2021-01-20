const filmModel = require("../models/film-model");
const authModel = require("../models/auth");
const orderModel = require("../models/order");

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

      daMuaPhimHayChua = user.purchasedFilms.find(
        (idPhim) => idPhim.toString() === id_phim.toString()
      );
      // console.log(daMuaPhimHayChua);
    }

    const responseFilm = { ...film._doc };

    if (!daMuaPhimHayChua) {
      delete responseFilm.urlFilm;
    }

    console.log(film);

    res.json({ films: responseFilm });
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
