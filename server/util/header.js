async function DefaultHeaders(req) {
	const { authorization } = await req?.headers;
	const headers = {
		"Content-Type": "application/json",
		authorization,
	};
	return headers;
}

module.exports = {
	DefaultHeaders,
};
