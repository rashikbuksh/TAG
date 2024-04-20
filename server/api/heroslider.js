const add = [
	{
		uri: "/heroslider/addslider",
		query: `INSERT INTO hero_slider (title, subtitle,slider_position, image) VALUES (?, ?, ?,?)`,
		body: ["title", "subtitle", "slider_position", "image"],
		msg: "title",
	},
];

const read = [
	{
		uri: "/heroslider/getslider",
		query: `SELECT * from hero_slider`,
	},
	{
		uri: "/heroslider/getslider/:level",
		query: `SELECT * from hero_slider WHERE slider_position= ? ORDER BY id DESC`,
		param: ["level"],
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
