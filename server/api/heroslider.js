const add = [
  {
    uri: "/heroslider/addslider",
    query: `INSERT INTO hero_slider (title, subtitle,slider_position, image) VALUES (?, ?, ?,?)`,
    body: ["title", "subtitle", "slider_position", "image"],
    msg: "title",
  },
];

const read = [
  {
    uri: "/heroslider/getslider",
    query: `SELECT * from hero_slider`,
  },
  {
    uri: "/heroslider/getslider/top",
    query: `SELECT * from hero_slider WHERE slider_position= "top"`,
  },
  {
    uri: "/heroslider/getslider/middel",
    query: `SELECT * from hero_slider WHERE slider_position= "middel"`,
  },
  {
    uri: "/heroslider/getslider/bottom",
    query: `SELECT * from hero_slider WHERE slider_position= "bottom"`,
  },
];

const remove = [
  {
    uri: "/heroslider/deleteslider/:id(*)",
    query: `DELETE FROM hero_slider WHERE id = ?`,
    param: ["id"],
  },
];

// Export modules
module.exports = Object.freeze({
  read,
  add,
  remove,
});
