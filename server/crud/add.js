const { app, ExecuteQuery } = require("../config");

const { add: JobEntry } = require("../api/job_entry");

const { add: Auth } = require("../api/auth");

const { add: Category } = require("../api/category");

const { add: Product } = require("../api/product");

const { add: ShopperProduct } = require("../api/shopperproduct");

const { add: Order } = require("../api/order");

const { add: News } = require("../api/news");

const { add: Notification } = require("../api/notification");

const { add: Heroslider } = require("../api/heroslider");

const ADD_DATA = [
	...JobEntry,
	...Auth,
	...Category,
	...Product,
	...ShopperProduct,
	...Order,
	...News,
	...Notification,
	...Heroslider,
];

ADD_DATA.forEach(({ uri, query, body, msg }) => {
	app.post(uri, (req, res) => {
		console.log(uri, query, body, msg);
		let bodyArr = [];
		body?.forEach((val) => {
			bodyArr.push(req?.body[val]);
		});

		ExecuteQuery(
			res,
			query,
			[...bodyArr],
			"add",
			`${req?.body[msg]} added successfully`
		);
	});
});
