const { app, ExecuteQuery } = require("../config");

const { read: JobEntry } = require("../api/job_entry");
const { read: RecordEntry } = require("../api/record_entry");
const { read: Auth } = require("../api/auth");
const { read: Profile } = require("../api/profile");
const { read: Category } = require("../api/category");
const { read: Product } = require("../api/product");
const { read: ShopperProduct } = require("../api/shopperproduct");
const { read: Order } = require("../api/order");
const { read: News } = require("../api/news");
const { read: Notification } = require("../api/notification");

const GET_DATA = [
	...JobEntry,
	...Auth,
	...Profile,
	...Category,
	...Product,
	...ShopperProduct,
	...Order,
	...News,
	...Notification,
];

GET_DATA.forEach(({ uri, query, param }) => {
	app.get(uri, (req, res) => {
		if (param === undefined) {
			ExecuteQuery(res, query);
			return;
		}

		let paramArr = [];
		param?.forEach((val) => {
			paramArr.push(req?.params[val]);
		});

		ExecuteQuery(res, query, [...paramArr]);
	});
});
