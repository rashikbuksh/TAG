import { api } from "@lib/api";
import { API } from "@lib/secret";
import Cookies from "js-cookie";
import { useEffect } from "react";
import useAsync from "./useAsync";

const DEFAULT_OPTIONS = {
	headers: {
		"Content-Type": "application/json",
		authorization: Cookies.get("auth"),
	},
};

function useFetch(url, dependencies = []) {
	return useAsync(async () => {
		return await fetch(`${API}${url}`, DEFAULT_OPTIONS).then(
			async (res) => {
				if (res.ok) {
					console.log(res);
					return res.json();
				}
				const json = await res.json();
				return await Promise.reject(json);
			}
		);
	}, dependencies);
}

async function defaultFetchFunc(
	url,
	setData,
	setLoading,
	setError,
	singleData = false
) {
	setLoading(true);
	setError(null);
	await api
		.get(url)
		.then((res) => setData(singleData ? res?.data[0] : res?.data))
		.catch((err) => setError(err?.response?.data))
		.finally(() => setLoading(false));
}

async function useFetchFunc(url, refreshId, setData, setLoading, setError) {
	useEffect(() => {
		const fetchData = async () => {
			await defaultFetchFunc(url, setData, setLoading, setError);
		};

		fetchData();
	}, [refreshId]);
}

async function useFetchFuncForReport(url, setData, setLoading, setError) {
	await defaultFetchFunc(url, setData, setLoading, setError, true);
}

const useFetchForRhfReset = async (uri, returnId, reset) => {
	useEffect(() => {
		if (returnId === null) return;

		api.get(uri).then((res) => reset(res?.data[0]));
	}, [returnId]);
};

const useFetchForRhfResetForOrder = async (uri, returnId, reset) => {
	useEffect(() => {
		if (returnId === null || returnId === undefined) return;

		api.get(uri).then((res) => reset(res?.data));
	}, [returnId]);
};

export {
	useFetch,
	useFetchForRhfReset,
	useFetchForRhfResetForOrder,
	useFetchFunc,
	useFetchFuncForReport,
};
