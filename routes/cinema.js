const express = require("express");
const { body } = require("express-validator");

const authController = require("../api/controller/auth-controller");
const filmController = require("../api/controller/film-controller");

const { authMiddleware } = require("../middleware/auth-middleware");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("sent");
});

// *'/login/'
router.post("/login", authController.postLogin);

// *
router.post(
  "/signup",
  [
    body("email").trim().isEmail().normalizeEmail(),
    body("password").trim().isLength({ min: 6 }),
  ],
  authController.postSignup
);

router.get("/auto-login", authController.autoLogin);

// */cash
router.get("/cash", authController.createCash);
router.post("/cash", authController.postCash);

// */orders
router.get("/orders", authController.getOrdersByUserId);

// */profile
router.get("/my-profile", authController.getProfileInfo);

// */edit-my-profile
router.put("/edit-my-profile/:id", authController.updateProfile);

// */search?name=vybeo&age=69
router.get("/search", filmController.searchFilmByName);

module.exports = router;
