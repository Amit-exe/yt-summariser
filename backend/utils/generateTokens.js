require("dotenv").config();
const jwt = require("jsonwebtoken");
function generateTokens(id, email) {
  const accessToken = jwt.sign(
    { id: id, email: email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRY },
  );

  const refreshToken = jwt.sign(
    { id: id, email: email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRY },
  );

  return { accessToken, refreshToken };
}

module.exports = generateTokens;
