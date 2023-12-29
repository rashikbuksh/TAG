import { api } from "../lib/api";

async function useDeleteFunc({ uri, itemId, setItems, onClose }) {
	try {
		const response = await api.delete(uri);
		setItems((prev) => prev.filter((item) => item.id !== itemId));
		alert(response);
	} catch (error) {
		alert(error?.response);
	} finally {
		onClose();
	}
}

export { useDeleteFunc };
