const read = [
  // {
  // 	uri: "/auth/verify_login",
  // 	query: `SELECT * from customer_profile where email = ? and password = ?`,
  // 	body: ["email", "password"],
  // 	msg: "email or password is incorrect",
  // },
  {
    uri: "/auth/getUserInfo/:id",
    query: `SELECT image, name, user_name, active_status, review_count, access from customer_profile where id = ?`,
    param: ["id"],
    msg: "id is incorrect",
  },
  {
    uri: "/auth/getShopperInfo",
    query: `SELECT id, image, name, user_name, review_count from customer_profile where access = "shopper"`,
  },
  {
    uri: "/auth/getALLUserInfo",
    query: `SELECT id, image, name, user_name, access from customer_profile`,
  },
  {
    uri: "/auth/getALLUserInfoForadmin",
    query: `SELECT id, image, name,phone,email, user_name, access  from customer_profile`,
  },
];

const add = [
  // {
  // 	uri: "/auth/register",
  // 	query: `INSERT INTO customer_profile (name, email, password, access) VALUES (?, ?, ?, ?)`,
  // 	body: ["name", "email", "password", "access"],
  // 	msg: "name",
  // },
  // {
  // 	uri: "/auth/registershopper",
  // 	query: `INSERT INTO customer_profile (name, phone, email, password, shipping_address, access) VALUES (?, ?, ?, ?, ?, ?)`,
  // 	body: [
  // 		"name",
  // 		"phone",
  // 		"email",
  // 		"password",
  // 		"shipping_address",
  // 		"access",
  // 	],
  // 	msg: "name",
  // },
];

// Export modules
module.exports = Object.freeze({
  read,
  add,
});
