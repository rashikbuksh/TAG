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
		return await fetch(`${API}${url}`, {
			...DEFAULT_OPTIONS,
		}).then(async (res) => {
			if (res.ok) return res.json();
			const json = await res.json();
			return await Promise.reject(json);
		});
	}, dependencies);
}

async function useFetchFunc(url, setData, setLoading, setError) {
	const abortCont = new AbortController();
	try {
		await fetch(
			`${API}${url}`,
			{ ...DEFAULT_OPTIONS },
			{ signal: abortCont.signal }
		)
			.then((res) => {
				if (!res?.ok) {
					throw Error("Could not fetch the data for that resource");
				}
				return res.json();
			})
			.then((res) => {
				setData(res);
				setLoading(false);
				setError(null);
			});
	} catch (err) {
		if (err.name === "AbortError") {
			
		} else {
			setLoading(false);
			setError(err.message);
		}
	}
	return () => abortCont.abort();
}

const useFetchForRhfReset = (uri, returnId, reset) => {
	useEffect(() => {
		if (returnId === null) return;
		api.get(uri).then((res) => {
			reset(res?.data[0]);
		});
	}, [reset, returnId, uri]);
};

export { useFetch, useFetchForRhfReset, useFetchFunc };
