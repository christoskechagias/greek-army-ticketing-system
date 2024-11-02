const jwt = require("jsonwebtoken");
const MESSAGES = require("../utils/messages.json");
const multer = require("multer");
const path = require("path");

require("dotenv").config();

const generateJWT = (user) => {
  const idToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.ID_TOKEN_KEY,
    { expiresIn: "1d" }
  );
  return idToken;
};

const authenticateMiddleware = (req, res, next) => {
  const idToken = req.cookies["id_token"];

  if (!idToken) {
    return res.status(401).json({ error: MESSAGES.INVALID_ID_TOKEN });
  }

  new Promise((resolve, reject) => {
    jwt.verify(idToken, process.env.ID_TOKEN_KEY, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  })
    .then((decoded) => {
      req.user = decoded;
      next();
    })
    .catch((error) => {
      let statusCode = 401;
      let errorMessage = MESSAGES.INVALID_ID_TOKEN;

      if (error.name === "TokenExpiredError") {
        statusCode = 401;
        errorMessage = MESSAGES.ID_TOKEN_EXPIRED;
      }

      return res.status(statusCode).json({ error: errorMessage });
    });
};

const setIdTokenCookie = (res, idToken) => {
  res.cookie("id_token", idToken);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("public", "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

module.exports = {
  generateJWT,
  authenticateMiddleware,
  setIdTokenCookie,
  storage,
};
