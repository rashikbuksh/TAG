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
