const add = [
  {
    uri: "/follow/addFollow",
    query: `INSERT INTO shopper_follower(follower_id, shopper_id,follow_date ) VALUES (?, ?,?)`,
    body: ["follower_id", "shopper_id","follow_date"],
    msg: "shopper_id",
  },
];
const read = [
  {
    uri: "/follow/getShopperFollow/:id",
    query: `SELECT * FROM shopper_follower WHERE shopper_id = ?`,
    param: ["id"],
    msg: "shopper_id",
  },
  {
    uri: "/follow/getFollow/:id",
    query: `SELECT * FROM shopper_follower WHERE follower_id = ?`,
    param: ["id"],
    msg: "shopper_id",
  },
];
const remove = [
  {
    uri: "/follow/deleteFollow/:id(*)",
    query: `DELETE FROM shopper_follower WHERE id = ?`,
    param: ["id"],
  },
];

// Export modules
module.exports = Object.freeze({
  add,
  read,
  remove,
});
