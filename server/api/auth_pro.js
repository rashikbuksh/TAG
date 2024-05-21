const { sign, verify } = require("jsonwebtoken");
const { genSalt, hash, compare } = require("bcrypt");
const { PRIVATE_KEY, SALT } = require("../config/secret");

function generateRegex(basePath) {
	return new RegExp(`^${basePath}/\\d+$`);
}

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

const getUserInfoRegex = generateRegex("/auth/getUserInfo");
const getProductRegex = generateRegex("/shopperproduct/getshopperproduct");
const getShopperProductRegex = generateRegex(
	"/shopperproduct/getshopperproductOfShopkeeper"
);
const CheckUserRegex = generateRegex("/auth/checkUser");

const getSearchedProductRegex =
	/^\/shopperproduct\/get-searched-product\/[^\/]+$/;

const VerifyToken = (req, res, next) => {
	const { authorization } = req?.headers;

	const urls = [
		"/auth/register",
		"/auth/registershopper",
		"/auth/getUserID",
		"/hero-slider/get-slider/bottom",
		"/hero-slider/get-slider/top",
		"/hero-slider/get-slider/middle",
		"/news/get-news",
		"/shopperproduct/getshopperproductBasedOnSaleCount",
		"/shopperproduct/getshopperproduct",
		"/shopperproduct/getPopularShopperProduct",
		"/category/get/category",
		"/adminShopperProduct/getshopperproduct",
		"/sentOtp",
		"/news/getHotNews",
		"/shop/getAllShop",
	];

	if (
		urls.includes(req?.originalUrl) ||
		getUserInfoRegex.test(req?.originalUrl) ||
		getProductRegex.test(req?.originalUrl) ||
		getShopperProductRegex.test(req?.originalUrl) ||
		CheckUserRegex.test(req?.originalUrl) ||
		getSearchedProductRegex.test(req?.originalUrl)
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
