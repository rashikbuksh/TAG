import { api } from "@lib/api";
import { toast } from "react-toastify";

async function useUpdateFunc({
	uri,
	data,
	itemId,
	updatedData,
	setItems,
	onClose = () => {},
	extraData = {},
}) {
	try {
		const response = await api.put(uri, updatedData);

		setItems((prev) =>
			prev.map(({ id, ...rest }) => {
				return id === itemId
					? {
							id,
							...data,
							...updatedData,
							...extraData,
					  }
					: {
							id,
							...rest,
					  };
			})
		);

		toast(response);
	} catch (error) {
		toast(error?.response);
	} finally {
		onClose();
	}
}

export { useUpdateFunc };
