const express = require("express");
const { body } = require("express-validator");

const authController = require("../api/controller/auth-controller");

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

module.exports = router;
