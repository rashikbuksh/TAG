import axios from "axios";
import Cookies from "js-cookie";
import { API } from "./secret";

export const api = axios.create({
	baseURL: API,
});

api.interceptors.request.use(
	async (config) => {
		const token = Cookies?.get("auth");
		if (token) {
			config.headers = {
				...config.headers,
				Authorization: token,
			};
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
