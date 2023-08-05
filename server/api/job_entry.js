/* __NOTE__

__PROBLEM: 1__
    If any parameter contains "/", then add "(*)" after the parameter name. 
    For example, in the following route: "/change/job-entry/:order_number(*)"
    the parameter "order_number" represents a value like "Anik-13/3/2023-Paharika-Srilanka"

__SOLUTION: 1__
    Put "(*)" after the parameter name.

 */

/**
 * @description This file contains all the queries for the table job_entry
 * @module job_entry
 * @requires config
 * @requires job_entry
 * @requires record_entry
 * @exports Object.freeze({
 *    add,
 *   read,
 *  change,
 * remove,
 * })
 * @example <caption>Example usage of 'module.exports'.</caption>
 * const { app, ExecuteQuery } = require("../config");
 * 
 */

//Create
const add = [
	{
		uri: "/add/current-status",
		query: `INSERT INTO current_status (order_job_number) VALUE (?)`,
		body: ["order_job_number"],
		msg: "order_job_number",
	},
];

// Read
const read = [
	{
		uri: "/get/job-entry",
		query: `SELECT * from job_entry`,
	},
	{
		uri: "/get/job-entry/:id/:bl_quantity",
		query: `SELECT * from job_entry where id = ? and bl_quantity = ?`,
		param: ["id", "bl_quantity"],
	},
	{
		uri: "/get/job-entry/:id",
		query: `SELECT * from job_entry where id = ?`,
		param: ["id"],
	},
];

// Update
const change = [
	{
		uri: "/change/job-entry/:order_number(*)",
		query: `UPDATE job_entry SET stevedore_contact_number = ? WHERE order_number = ?`,
		body: ["stevedore_contact_number"],
		param: ["order_number"],
		msg: "order_number",
	},
];

// Delete
const remove = [
	{
		uri: "/delete/job-entry/:order_number(*)",
		query: `DELETE FROM job_entry WHERE order_number = ?`,
		param: ["order_number"],
		msg: "order_number",
	},
	{
		uri: "/delete/current-status/:order_job_number(*)",
		query: `DELETE FROM current_status WHERE order_job_number = ?`,
		param: ["order_job_number"],
		msg: "order_job_number",
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
	change,
	remove,
});
