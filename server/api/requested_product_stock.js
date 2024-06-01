const add = [
  {
    uri: "/request-product-for-stock/add-request-product-for-stock",
    query: `INSERT INTO requested_product_stock (date, user_id, shopper_id, shopper_product_id)
        VALUES (?, ?, ?, ?)`,
    body: ["date", "user_id", "shopper_id", "shopper_product_id"],
    msg: "shopper_product_id",
  },
];
const read = [
  {
    uri: "/request-product-for-stock/Get-product/shopper/:shopper_id",
    query: `SELECT
    rp.id,
    rp.date,
    rp.user_id,
    rp.shopper_id,
    rp.shopper_product_id,
    sp.product_id,
    sp.price,
    sp.discount,
    p.name,
    p.image
FROM
    requested_product_stock rp
JOIN shopper_product sp ON
    rp.shopper_product_id = sp.id
JOIN product p ON
    sp.product_id = p.id
WHERE
    rp.shopper_id = ?
ORDER BY
    rp.date
DESC
    ;`,
    param: ["shopper_id"],
    msg: "shopper_id",
  },
  {
    uri: "/request-product-for-stock/Get-product/For-admin",
    query: `SELECT
    rp.id,
    rp.date,
    rp.user_id,
    rp.shopper_id,
    rp.shopper_product_id,
    sp.product_id,
    sp.price,
    sp.discount,
    p.name,
    p.image
FROM
    requested_product_stock rp
JOIN shopper_product sp ON
    rp.shopper_product_id = sp.id
JOIN product p ON
    sp.product_id = p.id
ORDER BY
    rp.date
DESC
    ;`,
    msg: "shopper_id",
  },
  {
    uri: "/request-product-for-stock/Get-product/user/:user_id",
    query: `SELECT * FROM requested_product_stock WHERE user_id = ? ORDER BY date DESC;`,
    param: ["user_id"],
    msg: "user_id",
  },
];

const change = [
  // {
  // 	uri: "/ordered-product/updateorderstatus/:id",
  // 	query: `UPDATE ordered_product
  // 			SET
  // 				discount=?,
  // 				quantity=?,
  // 				price=?,
  // 				weight=?
  // 			WHERE id=?`,
  // 	body: ["order_status"],
  // 	param: ["id"],
  // 	msg: "id",
  // },
];

const remove = [
  {
    uri: "/request-product-for-stock/delete/:id",
    query: `DELETE FROM requested_product_stock WHERE id=?`,
    param: ["id"],
    msg: "id",
  },
];

// Export modules
module.exports = Object.freeze({
  add,
  read,
  change,
  remove,
});
