const jwt = require("jsonwebtoken");

const secretkey = "akjhfwjsefkasecvybeoaljfalkwjf20358128957";

exports.authMiddleware = (req, res, next) => {
  try {
    const token = req.get("Authorization");

    // "Bearer ajweflkjaweklfja;wlkjfikasjclak;wjf"

    if (token) {
      const jwtToken = token.split(" ")[1];

      const decodedToken = jwt.verify(jwtToken, secretkey);

      req.userId = decodedToken.userId;
    }
  } catch (err) {
    console.log('auth-middleware.js', err);
  }

  next();
};
