import moment from "moment-timezone";

export default function FormattedTime({ time, format }) {
	const formattedTime = moment
		.utc(time, "YYYY-MM-DD HH:mm:ss")
		.tz("Asia/Dhaka")
		.format(format);

	return <>{formattedTime}</>;
}
export function addOneHour(timeString) {
	// Parse the provided time string into a Date object
	const currentTime = new Date(timeString);

	// Add 1 hour to the current time
	const newTime = new Date(currentTime.getTime() + 60 * 60 * 1000);

	// Convert the new time to toLocaleString string format

	const formattedTime = newTime.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
	return formattedTime;
}
