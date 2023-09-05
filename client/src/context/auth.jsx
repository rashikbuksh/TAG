import { createContext, useContext, useEffect, useState } from "react";
import { PROTECTED_ROUTES } from "../App";
import { useCookie } from "../hooks";
import { api } from "../lib/api";
import Axios from "axios";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const [authCookie, updateAuthCookie, removeAuthCookie] = useCookie("auth");
	const [userCookie, updateUserCookie, removeUserCookie] = useCookie("user");

	useEffect(() => {
		async function loadCookieData() {
			if (authCookie && userCookie) {
				setUser(JSON.parse(userCookie));
			}
			setLoading(false);
		}

		loadCookieData();
	}, []);

	const login = async (data) => {
		try {
			const res = await api.post("/auth/verify_login", {
				email: data.email,
				password: data.password,
			});
			console.log("res", res);
			const { token, user: loginUser } = res?.data;

			updateAuthCookie(token || "");
			updateUserCookie(JSON.stringify(loginUser) || "");

			if (token && loginUser) {
				const go = PROTECTED_ROUTES.find((route) =>
					route?.assigned?.includes(loginUser?.access)
				);
				window.location.href = go?.path;
			}
		} catch (error) {
			alert(error);
		}
	};

	const Logout = () => {
		removeAuthCookie();
		removeUserCookie();
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{ signed: !!user, user, loading, login, Logout }}
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
