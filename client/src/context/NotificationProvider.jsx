import { api } from "@lib/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		if (user) {
			const fetchNotifications = () => {
				api.get(
					`/notification/getnotification/${user.id}/${user.id}`
				).then((res) => {
					setNotifications(res.data);
				});
			};

			fetchNotifications();

			const intervalId = setInterval(fetchNotifications, 100000);

			return () => clearInterval(intervalId);
		}
	}, [user]);

	return (
		<NotificationContext.Provider
			value={{ notifications, setNotifications }}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => useContext(NotificationContext);
