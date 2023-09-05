
import { api } from "../lib/api";

async function useDeleteFunc({ uri, itemId, setItems, onClose }) {
	try {
		const response = await api.delete(uri);
		setItems((prev) => prev.filter((item) => item.id !== itemId));
		// const index = setItems.findIndex((item) => item.id == itemId);
		// console.log(index);
		// if (index !== -1) {
		// 	setItems((prev) => [
		// 		...prev.slice(0, index),
		// 		...prev.slice(index + 1),
		// 	]);
		// }
		alert(response);
	} catch (error) {
		alert(error?.response);
	} finally {
		onClose();
	}
}

export { useDeleteFunc };
