import React, { useEffect } from "react";
import Taglogo from "../../SvgHub/Taglogo";

const Welcome = () => {
	useEffect(() => {
		// Redirect to the home page after 2 seconds
		const redirectTimer = setTimeout(() => {
			window.location.href = "/home";
		}, 1500);
		// Clear the timer when the component unmounts
		return () => {
			clearTimeout(redirectTimer);
		};
	}, []);

	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center pt-[216px] ">
			<div className="h-[165px] flex-grow">
				<Taglogo />
			</div>
			<div className="flex-grow">
				<p className="text-sm font-semibold">Beta Version 23.0.1</p>
			</div>
		</div>
	);
};

export default Welcome;
