import { api } from "@lib/api";
import { toast } from "react-toastify";

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
