const { app, ExecuteQuery } = require("../config");

const { remove: JobEntry } = require("../api/job_entry");
const { remove: product } = require("../api/product");
const { remove: HeroSlider } = require("../api/heroslider");
const { remove: Newslike } = require("../api/newslike");
const { remove: Newscomment } = require("../api/newscomment");
const { remove: ShopperProduct } = require("../api/shopperproduct");
const { remove: News } = require("../api/news");
const { remove: user } = require("../api/auth");
const { remove: OrderProduct } = require("../api/ordered_product");
const { remove: shop } = require("../api/shop");
const {
  remove: customers_address_details,
} = require("../api/customers_address_details");
const REMOVE_DATA = [
  ...JobEntry,
  ...product,
  ...HeroSlider,
  ...Newslike,
  ...Newscomment,
  ...ShopperProduct,
  ...News,
  ...user,
  ...OrderProduct,
  ...shop,
  ...customers_address_details,
];

REMOVE_DATA.forEach(({ uri, query, param, msg }) => {
  app.delete(uri, (req, res) => {
    let paramArr = [];
    param?.forEach((val) => {
      paramArr.push(req?.params[val]);
    });

    ExecuteQuery(
      res,
      query,
      [...paramArr],
      "delete",
      `${req?.params[msg]} deleted successfully`
    );
  });
});
