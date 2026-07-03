const app = require("express");
const authRouter = app.Router();
const {
  register,
  login,
  refershToken,
  logout,
} = require("../controllers/authController");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refershToken", refershToken);

module.exports = authRouter;
