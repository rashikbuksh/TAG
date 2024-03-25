const { app, ExecuteQuery } = require("../config");

const { change: JobEntry } = require("../api/job_entry");
const { change: Profile } = require("../api/profile");
const { change: ShopperProduct } = require("../api/shopperproduct");
const { change: News } = require("../api/news");
const { change: Order } = require("../api/order");
const { change: product } = require("../api/product");
const { change: Auth } = require("../api/auth");
const { change: Refer } = require("../api/refer");
const { change: Util } = require("../api/util");
const { change: Notification } = require("../api/notification");
const { change: OrdredProduct } = require("../api/ordered_product");
const { change: ShopperSchedule } = require("../api/shopper_schedule");
const { change: shop } = require("../api/shop");
const { change: customers_address_details } = require("../api/customers_address_details");
const CHANGE_DATA = [
	...JobEntry,
	...Profile,
	...ShopperProduct,
	...News,
	...Order,
	...product,
	...Auth,
	...Refer,
	...Util,
	...Notification,
	...OrdredProduct,
	...ShopperSchedule,
	...shop,
	...customers_address_details
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
