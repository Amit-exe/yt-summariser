const pool = require("../config/db");
const AppError = require("../middleware/AppError");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const generateTokens = require("../utils/generateTokens");
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await pool.query("select email from users where email=$1", [
      email,
    ]);

    if (result.rows.length > 0) {
      throw new AppError("Email already Exist", 400);
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await pool.query(
        "Insert into users (name, email, password) values($1,$2,$3)",
        [name, email, hashPassword],
      );

      return res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "select id,email,password from users where email=$1",
      [email],
    );
    console.log(result.rows[0]);
    if (result.rows.length > 0) {
      const { id, email, password: dbpassword } = result.rows[0];
      const isvalid = await bcrypt.compare(password, dbpassword);
      if (isvalid) {
        const { accessToken, refreshToken } = generateTokens(id, email);

        await pool.query(
          "insert into refresh_tokens(user_id,token) values ($1,$2)",
          [id, refreshToken],
        );

        return res.status(200).json({ accessToken, refreshToken });
      } else {
        throw new AppError("Invalid credentials", 401);
      }
    } else {
      throw new AppError("Invalid credentials", 401);
    }
  } catch (error) {
    next(error);
  }
};

const refershToken = async (req, res, next) => {
  try {
    const { refreshToken: refToken } = req.body;

    const result = await pool.query(
      "select token,user_id from refresh_tokens where token=$1 ",
      [refToken],
    );
    if (result.rows.length > 0) {
      const { token: dbtoken, user_id } = result.rows[0];
      const { id, email } = jwt.verify(
        refToken,
        process.env.JWT_REFRESH_SECRET,
      );

      const { accessToken, refreshToken } = generateTokens(id, email);

      await pool.query("DELETE FROM refresh_tokens WHERE token = $1", [
        refToken,
      ]);
      await pool.query(
        "INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)",
        [id, refreshToken],
      );

      return res.status(200).json({ accessToken, refreshToken });
    } else {
      throw new AppError("Invalid refresh token", 401);
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken: refToken } = req.body;
    await pool.query("DELETE FROM refresh_tokens WHERE token = $1 ", [
      refToken,
    ]);
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, refershToken, logout };
