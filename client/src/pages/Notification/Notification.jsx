import Axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { ReactSVG } from "react-svg";
import { Breadcrumb, ErrorMessage, Preloader } from "../../components";
import useFetch from "../../hooks/use-fetch";

const Notification = () => {
	const [notification, setNotification] = useState([]);

	useEffect(() => {
		Axios.get(
			import.meta.env.VITE_APP_API_URL + "/notification/getnotification"
		).then((res) => {
			setNotification(res.data);
		});
	}, []);

	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<Breadcrumb pageTitle="Notification" prevUrl="/home" />
			<div className="notification-wrapper">
				{notification?.map((single) => (
					<div
						className={clsx(
							"notification-item",
							single.unread && "notification-item--unread"
						)}
						key={single.id}
					>
						<div
							dangerouslySetInnerHTML={{
								__html: single.notificationContent,
							}}
						/>
						<div className="notification-item__time">
							{" "}
							<span>
								<FaBell></FaBell>
							</span>{" "}
							{single.notificationTime}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Notification;
