const change = [
	{
		uri: "/schedule/edit-schedule/:shopper_id",
		query: `UPDATE shopper_schedule SET schedule_day = ? WHERE shopper_id = ?`,
		body: ["schedule_day"],
		param: ["shopper_id"],
		msg: "id",
	},
];

const add = [
	{
		uri: "/add-schedule",
		query: `INSERT INTO shopper_schedule (shopper_id , schedule_day) VALUES (?, ?)`,
		body: ["shopper_id", "schedule_day"],
		msg: "id",
	},
];

const read = [
	{
		uri: "/schedule/get-schedule/:shopper_id",
		query: `SELECT id, schedule_day FROM shopper_schedule WHERE shopper_id = ?`,
		param: ["shopper_id"],
		msg: "shopper_id",
	},
	{
		uri: "/schedule/getAllSchedule",
		query: `SELECT id, shopper_id, schedule_day FROM shopper_schedule`,
	},
];

// Export modules
module.exports = Object.freeze({
	read,
	add,
	change,
});
