const { app, ExecuteQuery } = require("../config");
const { db } = require("../config");
const { ComparePass, CreateToken } = require("../api/auth_pro");

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
const { read: Heroslider } = require("../api/heroslider");
const { read: Newslike } = require("../api/newslike");
const { read: Newscomment } = require("../api/newscomment");

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
	...Heroslider,
	...Newslike,
	...Newscomment,
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

app.post("/auth/verify_login", (req, res) => {
	console.log(req?.body.email, req?.body.password);

	const { email, password } = req?.body;

	db.getConnection((err, connection) => {
		if (err) {
			console.error("Error getting MySQL connection: ", err);
			return res.status(500).json({ error: "Database error" });
		}

		// Call your stored procedure
		connection.query(
			`Select * from customer_profile where email = ?`,
			[email],
			async (err, rows) => {
				console.log("row", rows);
				console.log("err", err);
				if (err) {
					console.error("Error getting MySQL connection: ", err);
					return res.status(500).json({ error: "Database error" });
				}

				if (rows?.length === 0) {
					return res.status(200).json({
						status: 200,
						type: "delete",
						message: "User not found",
					});
				}

				await ComparePass(password, rows[0].password).then((result) => {
					console.log(rows[0].password, result);
					if (!result) {
						console.log("result", result);
						return res.status(200).json({
							status: 200,
							type: "delete",
							message: "Email/Password combination incorrect",
						});
					}

					const token = CreateToken(rows[0]);
					const { id, name, access } = rows[0];

					if (!token.success) {
						return res
							.status(500)
							.json({ error: "Error signing token" });
					}

					return res.status(200).json({
						status: 201,
						type: "create",
						message: "User logged in",
						token: token.token,
						user: { id, name, access },
					});
				});

				connection.release();

				// Don't use the connection here, it has been returned to the pool.
			}
		);
	});
});
