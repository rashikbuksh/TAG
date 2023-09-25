const { db } = require("./db.js");
const { app } = require("./app.js");

const SendResponse = (res, operation, results = [], msg = "") => {
	const response = {
		add: { status: 201, type: "create", message: msg },
		update: { status: 200, type: "update", message: msg },
		delete: { status: 200, type: "delete", message: msg },
		"no-results": {
			status: 404,
			type: "error",
			message: "No results found",
		},
		"error-query": {
			status: 500,
			type: "error",
			message: "Error executing the query",
		},
		"error-connection": {
			status: 500,
			type: "error",
			message: "Error connecting to the database",
		},
		ER_DUP_ENTRY: {
			status: 409,
			type: "error",
			message: "Duplicate entry",
		},
	};

	const result = response[operation] || results;

	res.status(result.status || 200).json(result);
};

// operation = "add" | "update" | "delete" | "no-results" | "error-query" | "error-connection"
const ExecuteQuery = async (res, query, val = [], operation = "", msg = "") => {
	await db.getConnection((err, connection) => {
		if (err) {
			SendResponse(res, "error-connection");
			return;
		}

		connection.query(query, [...val], (error, results) => {
			connection.release(); // Release the connection

			if (error) {
				SendResponse(res, "error-query");
				return;
			}

			if (results?.length === 0) {
				SendResponse(res, "no-results");
				return;
			}

			SendResponse(res, operation, results, msg);
		});
	});
};

module.exports = Object.freeze({
	db,
	SendResponse,
	ExecuteQuery,
	app,
});
