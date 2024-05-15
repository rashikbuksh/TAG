import {
	FacebookIcon,
	InstagramIcon,
	Linkedin,
	TwitterIcon,
	WhatsappIcon,
	YoutubeIcon,
} from "@SvgHub/SocialIcon";
import { useEffect, useState } from "react";
import AppStore from "../../../src/assets/img/AppStore.png";
import PlayStore from "../../../src/assets/img/PlayStore.png";

const FooterSection = () => {
	const [currentYear, setCurrentYear] = useState("");

	useEffect(() => {
		// Function to get current year
		const getYear = () => {
			const year = new Date().getFullYear();
			setCurrentYear(year);
		};

		// Call the function when the component mounts
		getYear();
	}, []);

	return (
		<div className="mx-auto mt-3 max-w-7xl ">
			<div className="divider my-0"></div>
			<h1 className="ml-3  text-lg font-semibold">Follow Us</h1>
			<div className="mx-auto mt-5 flex w-[80%] justify-between">
				<a
					href="https://www.facebook.com/thinkandget10"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FacebookIcon />
				</a>
				<a
					href="https://www.linkedin.com/company/tagthink/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Linkedin />
				</a>
				<a
					href="https://www.youtube.com/@TAG011"
					target="_blank"
					rel="noopener noreferrer"
				>
					<YoutubeIcon />
				</a>
				<a
					href="https://wa.me/+8801533161339"
					target="_blank"
					rel="noopener noreferrer"
				>
					<WhatsappIcon />
				</a>
				<a
					href="https://www.instagram.com/thinkandget01/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<InstagramIcon />
				</a>
				{/* Assuming you have a Twitter account */}

				<TwitterIcon />
			</div>
			<div className="divider"></div>

			<h1 className="my-3 ml-3 mt-2 text-lg font-semibold">
				Download App (In Process)
			</h1>
			<div className="flex items-center justify-center gap-2">
				<img src={PlayStore} alt="" />
				<img src={AppStore} alt="" />
			</div>

			<div className="-mx-4 mt-4 flex h-[40px] items-center justify-center bg-black text-white">
				<p>
					Copyright {currentYear} Tagthinkandget.
					<span>All Rights Reserved</span>
				</p>
			</div>
			<div className="h-24"></div>
		</div>
	);
};

export default FooterSection;
