import axios from "axios";
import { useEffect, useReducer } from "react";

const initialState = {
	data: [],
	isLoading: true,
	errorMessage: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "FETCH_DATA_SUCCESS": {
			return {
				data: action.data,
				isLoading: false,
				errorMessage: null,
			};
		}
		case "FETCH_DATA_FAIL": {
			return {
				data: null,
				isLoading: false,
				errorMessage: action.errorMessage,
			};
		}
		default: {
			return state;
		}
	}
}

function useFetch(endpoint) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		const fetchData = () => {
			axios
				.get(
					import.meta.env.VITE_API_PUBLIC_URL + "/data/" + endpoint,
					{
						signal,
					}
				)
				.then((response) => {
					dispatch({
						type: "FETCH_DATA_SUCCESS",
						data: response.data,
					});
				})
				.catch((error) => {
					dispatch({
						type: "FETCH_DATA_FAIL",
						errorMessage: error.message,
					});
				});
		};

		fetchData();

		return () => {
			controller.abort();
		};
	}, [endpoint]);

	return state;
}

export default useFetch;
