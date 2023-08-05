const add = [
	{
		uri: "/product/addproduct",
		query: `INSERT INTO product( name, image, short_description, full_description, category_id) VALUES (?, ?, ?, ?, ?)`,
		body: [
			"name",
			"image",
			"short_description",
			"full_description",
			"category_id",
		],
		msg: "name",
	},
];

const read = [
	{
		uri: "/product/getproduct",
		query: `SELECT id,name FROM product`,
	},
	{
		uri: "/product/getproductimage/:productimageid",
		query: `SELECT image FROM product WHERE id = ?`,
		param: ["productimageid"],
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
});
