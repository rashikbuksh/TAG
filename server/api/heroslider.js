const add = [
	{
		uri: "/hero-slider/add-slider",
		query: `INSERT INTO hero_slider (title, subtitle,slider_position, image) VALUES (?, ?, ?,?)`,
		body: ["title", "subtitle", "slider_position", "image"],
		msg: "title",
	},
];

const read = [
	{
		uri: "/hero-slider/get-slider",
		query: `SELECT * from hero_slider`,
	},
	{
		uri: "/hero-slider/get-slider/:level",
		query: `SELECT * from hero_slider WHERE slider_position= ? ORDER BY id DESC`,
		param: ["level"],
	},
];

const remove = [
	{
		uri: "/hero-slider/delete-slider/:id(*)",
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
