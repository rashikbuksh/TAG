const add = [
	{
		uri: "/category/addcategory",
		query: `INSERT INTO category (name, url) VALUES (?, ?)`,
		body: ["name", "url"],
		msg: "name",
	},
];

const read = [
	{
		uri: "/category/getcategory",
		query: `SELECT id,name FROM category`,
	},
	{
		uri: "/category/getcategoryonProduct",
		query: `SELECT c.id,c.name, p.id as product_id FROM category c, product p WHERE c.id = p.category_id GROUP BY c.id`,
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
});
