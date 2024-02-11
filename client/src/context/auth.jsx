import Axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { PROTECTED_ROUTES } from "../App";
import { useCookie } from "../hooks";
import { api } from "../lib/api";
import { toast } from "react-toastify";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [loginError, setLoginError] = useState("");

	const [authCookie, updateAuthCookie, removeAuthCookie] = useCookie("auth");
	const [userCookie, updateUserCookie, removeUserCookie] = useCookie("user");

	useEffect(() => {
		async function loadCookieData() {
			if (authCookie && userCookie) {
				try {
					// Parse the user ID from the cookie
					const userId = JSON.parse(userCookie);
					// Fetch user information using the parsed user ID
					const response = await api.get(`/auth/userInfo/${userId}`);
					setUser(response.data[0]);
					setLoading(false);
				} catch (error) {
					console.error("Error loading user data:", error);
					setUser(null);
				}
			}
		}

		loadCookieData();
	}, [authCookie, userCookie]);

	const login = async (data) => {
		try {
			const res = await api.post("/auth/verify_login", {
				emailOrPhone: data.emailOrPhone,
				password: data.password,
			});
			if (res.data.message) {
				setLoginError(res.data.message);
				toast(`${res.data.message}`, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			}

			const { token, user: loginUser } = res?.data;
			updateAuthCookie(token || "");
			updateUserCookie(JSON.stringify(loginUser.id) || "");

			if (token && loginUser) {
				localStorage.setItem("user-id", loginUser?.id);
				if (loginUser.access === "admin") {
					window.location.href = "/admin/stat";
				} else if (loginUser.access === "shopper") {
					window.location.href = "/shopkeeperDashboard";
				} else if (loginUser.access === "moderator") {
					window.location.href = "/moderator/stat";
				} else if (loginUser.access === "new_shopper") {
					window.location.href = "/waitForVerify";
				} else {
					window.location.href = "/home";
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	const Logout = () => {
		removeAuthCookie();
		removeUserCookie();
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{ signed: !!user, user, loading, login, Logout, loginError }}
			// value={{ signed: true, user, loading, Login, Logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthProvider;
