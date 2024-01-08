import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Breadcrumb } from "../../components";
import NotificationSound from "../../helpers/NotificationSound";
import { api } from "../../lib/api";

const Notification = () => {
	const [notification, setNotification] = useState([]);
	const [user, setUser] = useState(null);
	const [userAccess, setUserAccess] = useState(null);

	const userid = localStorage.getItem("user-id");

	useEffect(() => {
		api.get(`/auth/getUserInfo/${userid}`).then((res) => {
			setUser(res.data);
			setUserAccess(res.data.access);
		});
		api.get(`/notification/getnotification/${userid}/${userid}`).then(
			(res) => {
				setNotification(res.data);
			}
		);
	}, []);

	const HandleUpdateNotificationStatus = (id) => {
		api.post(`/notification/readnotification/${id}`)
			.then((res) => {})
			.catch((err) => {
				console.error(err);
			});
	};

	const getOrderNumberFromNotification = (notification) => {
		const orderNumber = notification.split("#")[1].split(".")[0];
		return orderNumber;
	};
	const today = new Date().toDateString();
	const isToday = (date) => new Date(date).toDateString() === today;

	const todayNotifications = notification.filter((single) =>
		isToday(single.notification_time)
	);
	const olderNotifications = notification.filter(
		(single) => !isToday(single.notification_time)
	);
	return (
		<div className="body-wrapper my-10">
			<Breadcrumb pageTitle="Notification" prevUrl="/home" />
			<div className="notification-wrapper">
				<p className="bg-gray-300 px-2 py-2 font-bold">
					Todays Notification
				</p>
				{todayNotifications?.map((single) => (
					<div
						className={clsx(
							"notification-item",
							single.status == 1 && "notification-item--unread"
						)}
						key={single.id}
					>
						{single.notification_content.includes("commented") ? (
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									`/newsfeed`
								}
								onClick={() =>
									HandleUpdateNotificationStatus(single.id)
								}
							>
								<div
									className={`${
										notification[0].id === single.id
											? "text-red-600"
											: ""
									}`}
									dangerouslySetInnerHTML={{
										__html: single.notification_content,
									}}
								/>
							</Link>
						) : single.notification_content.includes("Order") ? (
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									`/orderShoperDetails/${getOrderNumberFromNotification(
										single.notification_content
									)}`
								}
								onClick={() =>
									HandleUpdateNotificationStatus(single.id)
								}
							>
								<div
									className={`${
										notification[0].id === single.id
											? "text-red-600"
											: ""
									}`}
									dangerouslySetInnerHTML={{
										__html: single.notification_content,
									}}
								/>
							</Link>
						) : (
							<div
								className={`${
									notification[0].id === single.id
										? "text-red-600"
										: ""
								}`}
								dangerouslySetInnerHTML={{
									__html: single.notification_content,
								}}
							/>
						)}
						{single.status ? <NotificationSound /> : ""}

						<div className="notification-item__time">
							{" "}
							<span>
								<FaBell></FaBell>
							</span>{" "}
							{single.notification_time}
						</div>
					</div>
				))}
				{todayNotifications.length === 0 && (
					<div className="notification-item">
						<div className="notification-item__time">
							{" "}
							<span>
								<FaBell></FaBell>
							</span>{" "}
							No Notification
						</div>
					</div>
				)}
				<p className="bg-gray-300 px-2 py-2 font-bold">
					Older Notification
				</p>
				{olderNotifications?.map((single) => (
					<div
						className={clsx(
							"notification-item",
							single.status == 1 && "notification-item--unread"
						)}
						key={single.id}
					>
						{single.notification_content.includes("commented") ? (
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									`/newsfeed`
								}
								onClick={() =>
									HandleUpdateNotificationStatus(single.id)
								}
							>
								<div
									className={`${
										notification[0].id === single.id
											? "text-red-600"
											: ""
									}`}
									dangerouslySetInnerHTML={{
										__html: single.notification_content,
									}}
								/>
							</Link>
						) : single.notification_content.includes("Order") ? (
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									`/orderShoperDetails/${getOrderNumberFromNotification(
										single.notification_content
									)}`
								}
								onClick={() =>
									HandleUpdateNotificationStatus(single.id)
								}
							>
								<div
									className={`${
										notification[0].id === single.id
											? "text-red-600"
											: ""
									}`}
									dangerouslySetInnerHTML={{
										__html: single.notification_content,
									}}
								/>
							</Link>
						) : (
							<div
								className={`${
									notification[0].id === single.id
										? "text-red-600"
										: ""
								}`}
								dangerouslySetInnerHTML={{
									__html: single.notification_content,
								}}
							/>
						)}
						{single.status ? <NotificationSound /> : ""}

						<div className="notification-item__time">
							{" "}
							<span>
								<FaBell></FaBell>
							</span>{" "}
							{single.notification_time}
						</div>
					</div>
				))}
				{olderNotifications.length === 0 && (
					<div className="notification-item">
						<div className="notification-item__time">
							{" "}
							<span>
								<FaBell></FaBell>
							</span>{" "}
							No Notification
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Notification;
