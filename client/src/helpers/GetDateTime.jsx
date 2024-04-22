const GetDateTime = () => {
	const currentDate = new Date();
	const date = currentDate
		.toLocaleDateString("en-GB")
		.split("/")
		.reverse()
		.join("-");
	const time = currentDate.toLocaleTimeString("en-GB", { hour12: false });

	return `${date} ${time}`;
};

export default GetDateTime;

export const FormatDateTimeInBST = (dateTimeString) => {
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		timeZone: "Asia/Dhaka", // Set the timezone to Bangladesh Standard Time
	};
	const formattedDate = new Date(dateTimeString).toLocaleDateString(
		undefined,
		options
	);
	return formattedDate;
};
export const FormatDateInBST = (dateTimeString) => {
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "Asia/Dhaka", // Set the timezone to Bangladesh Standard Time
	};
	const formattedDate = new Date(dateTimeString).toLocaleDateString(
		undefined,
		options
	);
	return formattedDate;
};
export const FormatTimeInBST = (dateTimeString) => {
	const options = {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true, // Use 12-hour clock with AM/PM
		timeZone: "Asia/Dhaka", // Set the timezone to Bangladesh Standard Time
	};
	const formattedTime = new Date(dateTimeString).toLocaleTimeString(
		undefined,
		options
	);

	return formattedTime;
};
export const ParseDateFromString = (dateString) => {
	const parsedDate = new Date(dateString);
	if (isNaN(parsedDate.getTime())) {
		// If parsing fails, try another format
		const parts = dateString.split(" ");
		if (parts.length === 3) {
			const monthIndex = FormatDateInBST.months.findIndex(
				(month) => month.toLowerCase() === parts[0].toLowerCase()
			);
			if (monthIndex !== -1) {
				return new Date(parts[2], monthIndex, parseInt(parts[1], 10));
			}
		}
	}
	return parsedDate;
};
