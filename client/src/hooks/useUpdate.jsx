
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

		alert(response);
	} catch (error) {
		alert(error?.response);
	} finally {
		onClose();
	}
}

export { useUpdateFunc };
