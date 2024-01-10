
import { toast } from "react-toastify";
import { api } from "../lib/api";

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
		const response = await api.post(uri, updatedData);

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
