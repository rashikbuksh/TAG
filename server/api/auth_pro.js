const { sign, verify } = require("jsonwebtoken");
const { genSalt, hash, compare } = require("bcrypt");
const { PRIVATE_KEY, SALT } = require("../config/secret");

const HashPass = async (password) => {
  const salt = await genSalt(Number(SALT));
  const hashPassword = await hash(password.toString(), parseInt(salt));
  return hashPassword;
};

const ComparePass = async (password, hashPassword) => {
  return await compare(password, hashPassword);
};

const CreateToken = (user, time = "730h") => {
  const payload = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    access: user?.access,
  };

  const token = sign(payload, PRIVATE_KEY, { expiresIn: time });

  if (!token)
    return {
      success: false,
      error: "Error signing token",
      raw: err,
    };

  user.token = token;
  return {
    success: true,
    token: token,
  };
};
const getUserInfoRegex = /^\/auth\/getUserInfo\/\d+$/;
const getProductRegex = /^\/shopperproduct\/getshopperproduct\/\d+$/;
const getShopperProductRegex =
  /^\/shopperproduct\/getshopperproductOfShopkeeper\/\d+$/;
const CheckUSerRegex = /^\/auth\/checkUser\/\d+$/;

const VerifyToken = (req, res, next) => {
  const { authorization } = req?.headers;

  if (
    req?.originalUrl == "/auth/register" ||
    req?.originalUrl == "/auth/registershopper" ||
    req?.originalUrl == "/auth/getUserID" ||
    req?.originalUrl == "/heroslider/getslider/bottom" ||
    req?.originalUrl == "/heroslider/getslider/top" ||
    req?.originalUrl == "/heroslider/getslider/middle" ||
    req?.originalUrl == "/news/getnews" ||
    req?.originalUrl == "/shopperproduct/getshopperproductBasedOnSaleCount" ||
    req?.originalUrl == "/shopperproduct/getshopperproduct" ||
    req?.originalUrl == "/shopperproduct/getPopularShopperProduct" ||
    req?.originalUrl == "/category/get/category" ||
    getUserInfoRegex.test(req?.originalUrl) ||
    getProductRegex.test(req?.originalUrl) ||
    getShopperProductRegex.test(req?.originalUrl) ||
    CheckUSerRegex.test(req?.originalUrl) ||
    req?.originalUrl == "/sentOtp" ||
    req?.originalUrl == "/news/getHotNews"
  ) {
    next();
  } else {
    if (typeof authorization !== "undefined") {
      verify(authorization, PRIVATE_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Forbidden" });

        req.user = user;
        next();
      });
    } else if (
      req?.originalUrl === "/auth/verify_login" &&
      req?.method === "POST"
    ) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  }
};

// Export
module.exports = {
  HashPass,
  ComparePass,
  CreateToken,
  VerifyToken,
};
