const { app, ExecuteQuery } = require("../config");

const { remove: JobEntry } = require("../api/job_entry");
const { remove: HeroSlider } = require("../api/heroslider");
const { remove: Newslike } = require("../api/newslike");
const { remove: Newscomment } = require("../api/newscomment");
const { remove: ShopperProduct } = require("../api/shopperproduct");
const { remove: News } = require("../api/news");
const { remove: user } = require("../api/auth");

const REMOVE_DATA = [
	...JobEntry,
	...HeroSlider,
	...Newslike,
	...Newscomment,
	...ShopperProduct,
	...News,
	...user
];

REMOVE_DATA.forEach(({ uri, query, param, msg }) => {
	app.delete(uri, (req, res) => {
		let paramArr = [];
		param?.forEach((val) => {
			paramArr.push(req?.params[val]);
		});
		console.log(uri, paramArr);

		ExecuteQuery(
			res,
			query,
			[...paramArr],
			"delete",
			`${req?.params[msg]} deleted successfully`
		);
	});
});
