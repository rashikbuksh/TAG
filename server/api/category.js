const add = [
	{
		uri: "/category/add-category",
		query: `INSERT INTO category (name, url) VALUES (?, ?)`,
		body: ["name", "url"],
		msg: "name",
	},
];

const read = [
	{
		uri: "/category/get-category",
		query: `SELECT id,name FROM category`,
	},
	{
		uri: "/category/get/category",
		query: `
			SELECT DISTINCT p.category_id as category_id, c.name as category_name
			FROM product p
			JOIN category c ON p.category_id = c.id;
		`,
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
});
