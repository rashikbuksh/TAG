const add = [
  {
    uri: "/product/addproduct",
    query: `INSERT INTO product( name, image, short_description,title, full_description, category_id,isVerified,price,quantity) VALUES (?, ?, ?, ?, ?,?,?,?,?)`,
    body: [
      "name",
      "image",
      "short_description",
      "title",
      "full_description",
      "category_id",
      "isVerified",
      "price",
      "quantity",
    ],
    msg: "name",
  },
];

const read = [
  {
    uri: "/product/getproduct",
    query: `SELECT id,name,image,price,quantity,category_id,isVerified FROM product`,
  },
  {
    uri: "/product/getallproduct",
    query: `SELECT * FROM product`,
  },
  {
    uri: "/product/getproductimage/:productimageid",
    query: `SELECT image FROM product WHERE id = ?`,
    param: ["productimageid"],
  },
];
const change = [
  {
    uri: "/product/update_varification/:id",
    query: `UPDATE product SET isVerified = ? WHERE id = ?`,
    body: ["isVerified"],
    param: ["id"],
  },
  {
    uri: "/product/update_product/:id",
    query: `UPDATE product SET name=?, short_description=?,full_description=?,title=? WHERE id = ?`,
    body: ["name", "short_description", "full_description","title"],
    param: ["id"],
  },
];

// Export modules
module.exports = Object.freeze({
  add,
  read,
  change,
});
