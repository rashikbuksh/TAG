const { app, ExecuteQuery } = require("../config");

const { remove: JobEntry } = require("../api/job_entry");

const { remove: HeroSlider } = require("../api/heroslider");

const { remove: Newslike } = require("../api/newslike");

const { remove: Newscomment } = require("../api/newscomment");

const REMOVE_DATA = [...JobEntry, ...HeroSlider, ...Newslike, ...Newscomment];

REMOVE_DATA.forEach(({ uri, query, param, msg }) => {
	app.delete(uri, (req, res) => {
		let paramArr = [];
		param?.forEach((val) => {
			paramArr.push(req?.params[val]);
		});

		ExecuteQuery(
			res,
			query,
			[...paramArr],
			"delete",
			`${req?.params[msg]} deleted successfully`
		);
	});
});
