const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const { DB_PORT, MAP_PORT, OSRM_GRAPH } = require("./secret");
var cors = require("cors");
const helmet = require("helmet");
const logfmt = require("logfmt");
const { json } = require("body-parser");

const app = express();

// CORS
var whitelist = [
	"http://localhost:3000",
	"http://localhost:3005",
	"http://localhost:4173",
	"https://backend.tagthinkandget.com",
	"https://tagthinkandget.com",
];
var corsOptionsDelegate = function (req, callback) {
	var corsOptions;
	if (whitelist.indexOf(req?.header("Origin")) !== -1) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(json());

app.use("/uploads", express.static("uploads"));

// Authenticate requests with JWT token
const { VerifyToken } = require("../api/auth_pro");
app.use(VerifyToken);

// const index = require("../util/index");

// const server = index.createServer({
// 	osrmDataPath: OSRM_GRAPH,
// });

// server.listen(MAP_PORT, () => {
// 	logfmt.log({
// 		start: "running server " + MAP_PORT,
// 		address: server.address().address,
// 		port: server.address().port,
// 		"osrm-dataset": OSRM_GRAPH,
// 	});
// });

// listen
app.listen(DB_PORT, () => {
	console.log("app listening on port " + DB_PORT);
});

module.exports = Object.freeze({
	app,
});
