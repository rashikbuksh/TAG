import { api } from "@lib/api";
import { toast } from "react-toastify";

const deleteItem = (prev, itemId) => {
	const index = prev.findIndex(({ id }) => id === itemId);
	if (index !== -1) prev.splice(index, 1);

	return [...prev];
};

async function useDeleteFunc({ uri, itemId, setItems, onClose }) {
	try {
		const response = await api.delete(uri);
		setItems((prev) => deleteItem(prev, itemId));
		toast(response);
	} catch (error) {
		toast(error?.response);
	} finally {
		onClose();
	}
}

export { useDeleteFunc };
