const add = [
  {
    uri: "/notification/addnotification",
    query: `INSERT INTO notification (notification_content, notification_time, not_from, not_to, status) VALUES (?, ?, ?, ?, ?)`,
    body: [
      "notification_content",
      "notification_time",
      "not_from",
      "not_to",
      "status",
    ],
    msg: "not_from",
  },
];
const read = [
  {
    uri: "/notification/getnotification/:userid/:user_id",
    query: `SELECT * FROM notification WHERE not_from = ?  ORDER BY notification_time desc`,
    param: ["userid", "user_id"],
    msg: "id",
  },
  {
    uri: "/notification/getUnreadNotification/:userid/:user_id",
    query: `SELECT * FROM notification WHERE not_from = ?  ORDER BY notification_time desc`,
    param: ["userid", "user_id"],
    msg: "id",
  },
  {
    uri: "/notification/getUnreadNotificationForDashboard/:userid/:user_id",
    query: `SELECT * FROM notification WHERE not_from = ? AND status = true  ORDER BY notification_time desc`,
    param: ["userid", "user_id"],
    msg: "id",
  },
];

const change = [
  {
    uri: "/notification/readnotification/:id",
    query: `UPDATE notification SET status = 0 WHERE id = ?`,
    param: ["id"],
    msg: "id",
  },
  {
    uri: "/notification/readNotification/:userId",
    query: `UPDATE notification SET status = 0 WHERE not_to = ?`,
    param: ["id"],
    msg: "id",
  },
  {
    uri: "/notification/changeToUnreadNotification/:id",
    query: `UPDATE notification SET status = 1 WHERE id = ?`,
    param: ["id"],
    msg: "id",
  },
];

// Export modules
module.exports = Object.freeze({
  add,
  read,
  change,
});
