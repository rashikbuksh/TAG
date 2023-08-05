const express = require("express");
const bodyParser = require("body-parser");
const { DB_PORT } = require("./secret");
var cors = require("cors");

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// listen
app.listen(DB_PORT, () => {
	console.log("Server listening on port " + DB_PORT);
});

module.exports = Object.freeze({
	app,
});
