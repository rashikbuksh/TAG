import { api } from "@lib/api";

async function usePostFunc(props) {
	const {
		uri,
		data,
		setItems,
		onClose,
		needJobId = false,
		needRecordId = false,
		needServiceId = false,
	} = props;

	try {
		const response = await api.post(uri, data);

		const { id } = response?.data ?? {};
		const date = new Date().toLocaleDateString("en", { year: "2-digit" });
		const padId = id?.toString()?.padStart(4, "0");

		const newItem = {
			...data,
			id,
			generated_job_entry_id: needJobId
				? `JE-${date}-${padId}`
				: data.generated_job_entry_id,
			generated_record_entry_id: needRecordId
				? `RE-${date}-${padId}`
				: data.generated_record_entry_id,
			generated_service_entry_id: needServiceId
				? `SE-${date}-${padId}`
				: data.generated_service_entry_id,
		};

		setItems((prev) => [newItem, ...prev]);
		toast(response ?? {});
	} catch (error) {
		toast(error?.response ?? {});
	} finally {
		onClose();
	}
}

export { usePostFunc };
