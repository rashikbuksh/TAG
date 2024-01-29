const os = require("os");

process.env.UV_THREADPOOL_SIZE = Math.ceil(os.cpus().length * 1.5);

const OSRM = require("@project-osrm/osrm");

function loadGraph(options) {
	const opts = { path: options.osrmDataPath };
	return new OSRM(opts);
}

module.exports = {
	loadGraph,
};
