const { app, ExecuteQuery } = require("../config");

const { change: JobEntry } = require("../api/job_entry");
const { change: Profile } = require("../api/profile");
const { change: ShopperProduct } = require("../api/shopperproduct");
const { change: News } = require("../api/news");
const { change: Order } = require("../api/order");
const { change: product } = require("../api/product");
const { change: Auth } = require("../api/auth");

const CHANGE_DATA = [
	...JobEntry,
	...Profile,
	...ShopperProduct,
	...News,
	...Order,
	...product,
	...Auth,
];

CHANGE_DATA.forEach(({ uri, query, body, param, msg }) => {
	app.post(uri, (req, res) => {
		let paramArr = [];
		param?.forEach((val) => {
			paramArr.push(req?.params[val]);
		});

		let bodyArr = [];
		body?.forEach((val) => {
			bodyArr.push(req?.body[val]);
		});

		ExecuteQuery(
			res,
			query,
			[...bodyArr, ...paramArr],
			"update",
			`${req?.params[msg]} updated successfully`
		);
	});
});
