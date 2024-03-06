const add = [
  {
    uri: "/shopperproduct/addshopperproduct",
    query: `INSERT INTO shopper_product( name, price, discount, product_count, product_id, shopper_id) VALUES (?, ?, ?, ?, ?, ?)`,
    body: [
      "name",
      "price",
      "discount",
      "product_count",
      "product_id",
      "shopper_id",
    ],
    msg: "name",
  },
];

// const add = [
// 	{
// 		uri: "/shopperproduct/addshopperproduct",
// 		query: `INSERT INTO shopper_product (name, price, discount, product_count, product_id, shopper_id)
// 		VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), ...`,
// 		body: [
// 			"name",
// 			"price",
// 			"discount",
// 			"product_count",
// 			"product_id",
// 			"shopper_id",
// 		],
// 		msg: "name",
// 	},
// ];

const read = [
  {
    uri: "/shopperproduct/getshopperproduct",
    query: `SELECT sp.id, sp.name, sp.price, discount, product_count, product_id, isVerified, category_id, p.image,p.title as title, sp.shopper_id, sale_count, sp.view, cp.shipping_address, cp.active_status FROM shopper_product sp, product p, customer_profile cp WHERE sp.product_id = p.id AND cp.id = sp.shopper_id AND product_count > 0`,
  },
  {
    uri: "/shopperproduct/getshopperproduct/:id",
    query: `SELECT sp.id, sp.name, sp.price, discount, product_count, product_id, isVerified, category_id, p.image,p.title as title, sp.shopper_id, sale_count, sp.view, p.full_description , p.short_description, cp.shipping_address, cp.active_status FROM shopper_product sp, product p, customer_profile cp WHERE sp.product_id = p.id AND cp.id = sp.shopper_id and sp.id = ?`,
    param: ["id"],
  },
  {
    uri: "/shopperproduct/getshopperproductAdmin/:id",
    query: `SELECT sp.id, sp.name, sp.price, discount, product_count, product_id, isVerified, category_id, p.image,p.title as title, sp.shopper_id, sale_count, sp.view, cp.shipping_address FROM shopper_product sp, product p, customer_profile cp WHERE sp.product_id = p.id AND cp.id = sp.shopper_id and sp.shopper_id = ?`,
    param: ["id"],
  },
  {
    uri: "/shopperproduct/getshopperproductName/:id",
    query: `SELECT name FROM shopper_product WHERE id in (?)`,
    param: ["id"],
  },
  {
    uri: "/shopperproduct/getshopperproductOfShopkeeper/:id",
    query: `SELECT sp.id, sp.name,sp.shopper_id, sp.price, discount, product_count, product_id, category_id, p.image,p.title as title,p.isVerified, sp.view, cp.shipping_address FROM shopper_product sp, product p, customer_profile cp WHERE sp.product_id = p.id and cp.id = sp.shopper_id and shopper_id = ?`,
    param: ["id"],
  },
  {
    uri: "/shopperproduct/getLastProduct/:id",
    query: `SELECT sp.*, p.image as product_image
    FROM shopper_product sp
    JOIN product p ON sp.product_id = p.id
    WHERE sp.shopper_id = ?
    ORDER BY sp.id DESC
    LIMIT 1;`,
    param: ["id"],
  },
  {
    uri: "/shopperproduct/getshopperproductBasedOnSaleCount",
    query: `SELECT sp.id, sp.name, sp.price, discount, product_count, product_id, category_id, p.image,p.title as title, sp.shopper_id, sale_count, sp.view, cp.shipping_address FROM shopper_product sp, product p, customer_profile cp WHERE sp.product_id = p.id and cp.id = sp.shopper_id ORDER BY sale_count DESC LIMIT 2`,
  },
  {
    uri: "/shopperproduct/getAllshopperproductBasedOnSaleCount",
    query: `SELECT sp.id, sp.name, sp.price, discount, product_count, product_id, category_id, p.image,p.title as title, sp.shopper_id, sale_count, sp.view, cp.shipping_address FROM shopper_product sp, product p, customer_profile cp WHERE sp.product_id = p.id and cp.id = sp.shopper_id ORDER BY sale_count DESC `,
  },
  {
    uri: "/shopkeeperproduct/getshopkeeperproductCount/:id",
    query: `SELECT COUNT(*) as count FROM shopper_product WHERE shopper_id = ?`,
    param: ["id"],
  },
  {
    uri: "/shopperproduct/getPopularShopperProduct",
    query: `SELECT
              sp.id,
              sp.name,
              sp.price,
              sp.discount,
              sp.product_count,
              p.isVerified,
              sp.product_id,
              p.category_id,
              p.image,
              p.title as title,
              sp.shopper_id,
              sp.sale_count,
              sp.view,
              cp.active_status,
			  cp.shipping_address
          FROM
              shopper_product sp
          JOIN product p ON
              sp.product_id = p.id
          JOIN customer_profile cp ON
              sp.shopper_id = cp.id
          ORDER BY
              sp.sale_count
          DESC
          LIMIT 5`,
  },
  {
    uri: "/shopperproduct/get-searched-product/:keyword",
    query: `SELECT sp.id, sp.name, sp.price, sp.discount, sp.product_count, isVerified, product_id, category_id, p.image,p.title as title, sp.shopper_id, sp.sale_count, sp.view, cp.active_status, cp.shipping_address
				FROM shopper_product sp
				JOIN product p ON sp.product_id = p.id
        JOIN customer_profile cp ON sp.shopper_id = cp.id
				WHERE sp.name LIKE CONCAT('%', ?, '%');`,
    param: ["keyword"],
  },
  {
    uri: "/adminShopperProduct/getshopperproduct",
    query: `SELECT sp.id, sp.name, sp.price, sp.discount, sp.product_count, sp.product_id, p.isVerified, p.category_id, p.image, p.title as title, sp.shopper_id, sp.sale_count, sp.view, cp.shipping_address, cp.active_status FROM shopper_product sp JOIN product p ON sp.product_id = p.id JOIN customer_profile cp ON cp.id = sp.shopper_id WHERE sp.product_count > 0 AND cp.access = 'admin';;
`,
  },
];

const change = [
  {
    uri: "/product/updateProductCount",
    query: `UPDATE shopper_product SET product_count = ? WHERE id = ?`,
    body: ["product_count", "id"],
    msg: "id",
  },
  {
    uri: "/product/decreaseProductCount",
    query: `UPDATE shopper_product SET product_count = product_count - ? WHERE id = ?`,
    body: ["product_quantity", "id"],
    msg: "id",
  },
  {
    uri: "/shopperproduct/increaseView/:id",
    query: "UPDATE shopper_product SET view = view + 1 where id = ?",
    param: ["id"],
  },
  {
    uri: "/shopperproduct/updateProductPrice",
    query: `UPDATE shopper_product SET price = ? WHERE id = ?`,
    body: ["price", "id"],
  },
  {
    uri: "/shopperproduct/updateProductDetails",
    query: `UPDATE shopper_product SET price = ?, discount = ?, product_count = ? WHERE id = ?`,
    body: ["price", "discount", "quantity", "id"],
  },
];

const remove = [
  {
    uri: "/shopperproduct/deleteshopperproduct/:id",
    query: `DELETE FROM shopper_product WHERE id = ?`,
    param: ["id"],
  },
];

// Export modules
module.exports = Object.freeze({
  add,
  read,
  change,
  remove,
});
