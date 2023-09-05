const express = require("express");
const bodyParser = require("body-parser");
const { DB_PORT } = require("./secret");
var cors = require("cors");

const app = express();

// Configure CORS
const whitelist = ["http://localhost:3000", "http://localhost:3005"];

const corsOptionsDelegate = (req, callback) => {
	const corsOptions = {
		origin: whitelist.includes(req?.header("Origin")) ? true : false,
	};
	callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// Authenticate requests with JWT token
const { VerifyToken } = require("../api/auth_pro");
app.use(VerifyToken);

// listen
app.listen(DB_PORT, () => {
	console.log("Server listening on port " + DB_PORT);
});

module.exports = Object.freeze({
	app,
});
