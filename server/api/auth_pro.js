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
const getShopperProductUpdateRegex =
	/^\/shopperproduct\/getshopperproduct\/by\/shopper-id\/[^\/]+$/;
const CheckUSerRegex = /^\/auth\/checkUser\/\d+$/;
const getSearchedProductRegex =
	/^\/shopperproduct\/get-searched-product\/[^\/]+$/;
const getFollowRegex = /^\/follow\/getShopperFollow\/[^\/]+$/;
const getShopperProductRegex =
	/^\/shopperproduct\/getshopperproduct\/by\/id\/[^\/]+$/;

const VerifyToken = (req, res, next) => {
	const { authorization } = req?.headers;

	if (
		req?.originalUrl == "/auth/register" ||
		req?.originalUrl == "/auth/registershopper" ||
		req?.originalUrl == "/auth/getUserID" ||
		req?.originalUrl == "/hero-slider/get-slider/bottom" ||
		req?.originalUrl == "/hero-slider/get-slider/top" ||
		req?.originalUrl == "/hero-slider/get-slider/middle" ||
		req?.originalUrl == "/news/get-news" ||
		req?.originalUrl ==
			"/shopperproduct/getshopperproductBasedOnSaleCount" ||
		req?.originalUrl == "/shopperproduct/getshopperproduct" ||
		req?.originalUrl == "/shopperproduct/getPopularShopperProduct" ||
		req?.originalUrl == "/category/get/category" ||
		req?.originalUrl == "/adminShopperProduct/getshopperproduct" ||
		getUserInfoRegex.test(req?.originalUrl) ||
		getProductRegex.test(req?.originalUrl) ||
		getShopperProductRegex.test(req?.originalUrl) ||
		CheckUSerRegex.test(req?.originalUrl) ||
		getSearchedProductRegex.test(req?.originalUrl) ||
		getShopperProductUpdateRegex.test(req?.originalUrl) ||
		getFollowRegex.test(req?.originalUrl) ||
		req?.originalUrl == "/sentOtp" ||
		req?.originalUrl == "/news/getHotNews" ||
		req?.originalUrl == "/shop/getAllShop"
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
