import { api } from "@lib/api";
import { toast } from "react-toastify";

const postItem = (prev, data, id) => {
	return [
		{
			...data,
			id,
		},
		...prev,
	];
};

async function usePostFunc({
	uri,
	data,
	setItems = () => {},
	onClose = () => {},
}) {
	try {
		const response = await api.post(uri, data);
		const { id } = response?.data;

		setItems((prev) => postItem(prev, data, id));
		toast(response);
	} catch (error) {
		toast(error?.response);
	} finally {
		onClose();
	}
}

export { usePostFunc };
