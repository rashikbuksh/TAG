const { app, ExecuteQuery } = require("../config");
const { db } = require("../config");
const { createApi } = require("../util/api");
const { ComparePass, CreateToken, HashPass } = require("../api/auth_pro");
const { read: Auth } = require("../api/auth");
const { read: Profile } = require("../api/profile");
const { read: Category } = require("../api/category");
const { read: Product } = require("../api/product");
const { read: ShopperProduct } = require("../api/shopperproduct");
const { read: Order } = require("../api/order");
const { read: News } = require("../api/news");
const { read: Notification } = require("../api/notification");
const { read: Heroslider } = require("../api/heroslider");
const { read: Newslike } = require("../api/newslike");
const { read: Newscomment } = require("../api/newscomment");
const { read: Refer } = require("../api/refer");
const { read: Util } = require("../api/util");
const { read: OrderedProduct } = require("../api/ordered_product");
const { read: ShopperSchedule } = require("../api/shopper_schedule");
const { read: shop } = require("../api/shop");
const {
  read: customers_address_details,
} = require("../api/customers_address_details");
const { read: shopper_follower } = require("../api/shopper_follower");
const {
  read: requested_product_stock,
} = require("../api/requested_product_stock");

const GET_DATA = [
  ...Auth,
  ...Profile,
  ...Category,
  ...Product,
  ...ShopperProduct,
  ...Order,
  ...News,
  ...Notification,
  ...Heroslider,
  ...Newslike,
  ...Newscomment,
  ...Refer,
  ...Util,
  ...OrderedProduct,
  ...ShopperSchedule,
  ...shop,
  ...customers_address_details,
  ...shopper_follower,
  ...requested_product_stock,
];

GET_DATA.forEach(({ uri, query, param }) => {
  app.get(uri, (req, res) => {
    if (param === undefined) {
      ExecuteQuery(res, query);
      return;
    }

    let paramArr = [];
    param?.forEach((val) => {
      paramArr.push(req?.params[val]);
    });

    ExecuteQuery(res, query, [...paramArr]);
  });
});

app.post("/auth/verify_login", (req, res) => {
  const { emailOrPhone, password } = req?.body;

  

  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection: ", err);
      return res.status(500).json({ error: "Database error" });
    }
    let queryField = "email";
    if (/^\+?[0-9]{8,}$/.test(emailOrPhone)) {
      // Check if input resembles a phone number
      queryField = "phone";
    } else {
      queryField = "email";
    }
    // Call your stored procedure
    connection.query(
      `Select * from customer_profile where ${queryField} = ?`,
      [emailOrPhone],

      async (err, rows) => {
        if (err) {
          console.error("Error getting MySQL connection: ", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (rows?.length === 0) {
          return res.status(200).json({
            status: 200,
            type: "delete",
            message: "User not found",
          });
        }

        await ComparePass(password, rows[0].password).then((result) => {
          if (!result) {
            return res.status(200).json({
              status: 200,
              type: "delete",
              message: "Email/Password combination incorrect",
            });
          }

          const token = CreateToken(rows[0]);
          const { id, name, access } = rows[0];

          if (!token.success) {
            return res.status(500).json({ error: "Error signing token" });
          }

          return res.status(200).json({
            status: 201,
            type: "create",
            message: "User logged in",
            token: token.token,
            user: { id, name, access },
          });
        });

        connection.release();

        // Don't use the connection here, it has been returned to the pool.
      }
    );
  });
});

app.post("/auth/getUserID", (req, res) => {
  const { phone } = req?.body;

  const query = `SELECT id from customer_profile where phone=?`;

  ExecuteQuery(res, query, [phone]);
});

app.get("/order/get-product-by-id/:id", async (req, res) => {
  try {
    const api = await createApi(req);
    const { id } = req?.params;
    // get Order UUID from id
    const { data: order_uuid } = await api.get(`/order/get-order-uuid/${id}`);

    const fetchData = async (endpoint) =>
      await api.get(`${endpoint}/by/${order_uuid[0]?.order_uuid}`);

    const [order, ordered_product] = await Promise.all([
      fetchData("order/get-product"),
      fetchData("ordered-product/get-ordered-product"),
    ]);
    console.log(order.data,"order data needed");
    const response = {
      ...order?.data[0],
      ordered_product: ordered_product?.data || [],
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/auth/changePassword", (req, res) => {
  const { emailOrPhone, oldPassword, newPassword } = req?.body;

  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection: ", err);
      return res.status(500).json({ error: "Database error" });
    }
    let queryField = "email";
    if (/^\+?[0-9]{8,}$/.test(emailOrPhone)) {
      // Check if input resembles a phone number
      queryField = "phone";
    } else {
      queryField = "email";
    }
    // Call your stored procedure
    connection.query(
      `SELECT * FROM customer_profile WHERE ${queryField} = ?`,
      [emailOrPhone],
      async (err, rows) => {
        if (err) {
          console.error("Error getting MySQL connection: ", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (rows?.length === 0) {
          return res.status(200).json({
            status: 200,
            type: "delete",
            message: "User not found",
          });
        }

        await ComparePass(oldPassword, rows[0].password).then(async (result) => {
          if (!result) {
            return res.status(200).json({
              status: 200,
              type: "delete",
              message: "Email/Password combination incorrect",
            });
          }

          const hashedNewPassword = await HashPass(newPassword);

          connection.query(
            `UPDATE customer_profile SET password = ? WHERE ${queryField} = ?`,
            [hashedNewPassword, emailOrPhone],
            (err, result) => {
              if (err) {
                console.error("Error updating password: ", err);
                return res.status(500).json({ error: "Database error" });
              }

              const { id, name, access } = rows[0];

              return res.status(200).json({
                status: 200,
                message: "Password updated successfully",
                user: { id, name, access },
              });
            }
          );

          connection.release();
        });

        // Don't use the connection here, it has been returned to the pool.
      }
    );
  });
});