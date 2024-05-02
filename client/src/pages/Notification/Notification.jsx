import { Breadcrumb } from "@components";
import { useNotification } from "@context/NotificationProvider";
import NotificationSound from "@helpers/NotificationSound";
import { api } from "@lib/api";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FormatDateInBST, FormatTimeInBST } from "@helpers/GetDateTime";

const Notification = () => {
    const { notifications } = useNotification();
    const [user, setUser] = useState(null);
    const [userAccess, setUserAccess] = useState(null);
    const userid = localStorage.getItem("user-id");

    useEffect(() => {
        const fetchNotifications = () => {
            api.get(`/auth/getUserInfo/${userid}`).then((res) => {
                setUser(res.data);
                setUserAccess(res.data.access);
            });
        };
        fetchNotifications();
    }, [userid]);

    const HandleUpdateNotificationStatus = (id) => {
        api.post(`/notification/readnotification/${id}`)
            .then((res) => {
                // console.log(res);
            })
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

    const renderNotificationItem = (single) => (
        <div
            className={clsx(
                "notification-item",
                single.status === 1 && "notification-item--unread"
            )}
            key={single.id}
        >
            {single.notification_content.includes("commented") ||
            single.notification_content.includes("Order") ||
            single.notification_content.includes("Completed your order Successfully") ? (
                <Link
                    to={
                        single.notification_content.includes("commented")
                            ? import.meta.env.VITE_API_PUBLIC_URL + "/newsfeed"
                            : single.notification_content.includes("Order")
                            ? import.meta.env.VITE_API_PUBLIC_URL +
                              `/orderShoperDetails/${getOrderNumberFromNotification(
                                  single.notification_content
                              )}`
                            : import.meta.env.VITE_API_PUBLIC_URL +
                              `/orderDetails/${getOrderNumberFromNotification(
                                  single.notification_content
                              )}`
                    }
                    onClick={() => HandleUpdateNotificationStatus(single.id)}
                >
                    <div
                        className={single.status === 1 ? "text-red-600" : ""}
                        dangerouslySetInnerHTML={{
                            __html: single.notification_content,
                        }}

                    />
                </Link>
            ) : (
                <div
                    className={single.status === 1 ? "text-red-600" : ""}
                    dangerouslySetInnerHTML={{
                        __html: single.notification_content,
                    }}
                />
            )}
            {/* {single.status && <NotificationSound />} */}
            <div className="notification-item__time">
                <span>
                    <FaBell />
                </span>{" "}

				{FormatTimeInBST(single.notification_time)},{FormatDateInBST(single.notification_time)} 
                {/* {single.notification_time} */}
            </div>
        </div>
    );

    const todayNotifications = notifications.filter((single) =>
        isToday(single.notification_time)
    );
    const olderNotifications = notifications.filter(
        (single) => !isToday(single.notification_time)
    );

    return (
        <div className="body-wrapper my-10">
            <Breadcrumb pageTitle="Notification" prevUrl="/home" />
            <div className="notifications-wrapper">
                <p className="bg-gray-300 px-2 py-2 font-bold">
                    Todays Notification
                </p>
                {todayNotifications.length > 0 ? (
                    todayNotifications.map((single) => renderNotificationItem(single))
                ) : (
                    <div className="notification-item">
                        <div className="notification-item__time">
                            <span>
                                <FaBell />
                            </span>
                            No Notification
                        </div>
                    </div>
                )}
                <p className="bg-gray-300 px-2 py-2 font-bold">
                    Older Notification
                </p>
                {olderNotifications.length > 0 ? (
                    olderNotifications.map((single) => renderNotificationItem(single))
                ) : (
                    <div className="notification-item">
                        <div className="notification-item__time">
                            <span>
                                <FaBell />
                            </span>
                            No Notification
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notification;
