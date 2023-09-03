const add = [
	{
		uri: "/heroslider/addslider",
		query: `INSERT INTO hero_slider (title, subtitle, image) VALUES (?, ?, ?)`,
		body: ["title", "subtitle", "image"],
		msg: "title",
	},
];

const read = [
	{
		uri: "/heroslider/getslider",
		query: `SELECT * from hero_slider`,
	},
];

const remove = [
	{
		uri: "/heroslider/deleteslider/:id(*)",
		query: `DELETE FROM hero_slider WHERE id = ?`,
		param: ["id"],
	},
];

// Export modules
module.exports = Object.freeze({
	read,
	add,
	remove,
});
