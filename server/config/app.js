const express = require("express");
const bodyParser = require("body-parser");
const { DB_PORT } = require("./secret");
var cors = require("cors");
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

const OSRM = require("@project-osrm/osrm");
// importing random coordinates in Bangladesh used as sources and destinations

console.log(OSRM);

const osrm = new OSRM("./MapData/bangladesh-latest.osrm");

console.log(osrm);

const coordinates = [
	[90.4219168, 23.7517979],
	[91.4219169, 24.751798],
];

const makeOsrmOptions = (sources, destinations) => {
	return {
		coordinates: coordinates,
		sources: sources || [],
		destinations: destinations || [],
		annotations: ["distance", "duration"],
	};
};

const osrmOptions = makeOsrmOptions();
osrm.table(osrmOptions, (err, result) => {
	if (err) {
		console.log(err);
	}
	// console.table(result);
});

osrm.route(
	{
		coordinates: [
			[90.4219168, 23.7517979],
			[91.4219169, 24.751798],
		],
	},
	function (err, result) {
		if (err) throw err;
		console.log(result.waypoints); // array of Waypoint objects representing all waypoints in order
		console.log(result.routes); // array of Route objects ordered by descending recommendation rank
	}
);

// listen
app.listen(DB_PORT, () => {
	console.log("app listening on port " + DB_PORT);
});

module.exports = Object.freeze({
	app,
});
