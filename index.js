// *Thu  vien
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

// *Route
const cinemaRoutes = require("./routes/cinema");
const adminRoutes = require("./routes/admin");
const clientRoutes = require("./routes/client");

const { authMiddleware } = require("./middleware/auth-middleware");

const app = express();

const port = process.env.PORT || 4000;
const MONGO_URI =
  "mongodb+srv://sonvydat:sUSWkOuIXeoMNEe5@cluster0.50vn7.mongodb.net/rap_phim?retryWrites=true&w=majority";

// *Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny"));

app.use(authMiddleware);

// *Route
app.use("/admin-page", adminRoutes);
app.use(cinemaRoutes);
app.use("/client-page", clientRoutes);

// Muốn xài next(err) thì phải có cái này
// error handling express
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message =
    error.message || "Có lỗi với server, xin vui lòng thử lại sau.";

  res.status(statusCode).json({ message: message });
});

// *Bat server len o port bao nhieu
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
