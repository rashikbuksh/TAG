const { app, ExecuteQuery } = require("../config");
const { db } = require("../config");
const { HashPass } = require("../api/auth_pro");

const { add: JobEntry } = require("../api/job_entry");

const { add: Auth } = require("../api/auth");

const { add: Category } = require("../api/category");

const { add: Product } = require("../api/product");

const { add: ShopperProduct } = require("../api/shopperproduct");

const { add: Order } = require("../api/order");

const { add: News } = require("../api/news");

const { add: Notification } = require("../api/notification");

const { add: Heroslider } = require("../api/heroslider");

const { add: Newslike } = require("../api/newslike");

const { add: Newscomment } = require("../api/newscomment");

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
	...Newslike,
	...Newscomment,
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

app.post("/auth/register", async (req, res) => {
	console.log("register: ", req?.body);
	const { name, email, phone, password, access } = req?.body;
	const hashPassword = await HashPass(password);

	ExecuteQuery(
		res,
		`INSERT INTO customer_profile (name, email, phone, password, access) VALUES (?, ?, ?, ?, ?)`,
		[name, email, phone, hashPassword, access],
		"add",
		`${phone}`
	);
});

app.post("/auth/registershopper", async (req, res) => {
	const { name, phone, email, password, shipping_address, access } =
		req?.body;
	const hashPassword = await HashPass(password);

	ExecuteQuery(
		res,
		`INSERT INTO customer_profile (name, phone, email, password, shipping_address, access) VALUES (?, ?, ?, ?, ?, ?)`,
		[name, phone, email, hashPassword, shipping_address, access],
		"add",
		`${name} added successfully`
	);
});
