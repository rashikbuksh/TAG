import moment from "moment-timezone";

export default function FormattedTime({ time, format }) {
	const formattedTime = moment
		.utc(time, "YYYY-MM-DD HH:mm:ss")
		.tz("Asia/Dhaka")
		.format(format);

	return <>{formattedTime}</>;
}
