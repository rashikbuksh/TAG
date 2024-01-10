import { toast } from "react-toastify";
import { api } from "../lib/api";

async function useDeleteFunc({ uri, itemId, setItems, onClose }) {
	try {
		const response = await api.delete(uri);
		setItems((prev) => prev.filter((item) => item.id !== itemId));
		toast(response);
	} catch (error) {
		toast(error?.response);
	} finally {
		onClose();
	}
}

export { useDeleteFunc };
