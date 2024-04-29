import { useState } from "react";
import { toast } from "react-toastify";

const useClipboard = () => {
	const [copySuccess, setCopySuccess] = useState(null);

	const copyToClipboard = (text) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setCopySuccess(true);
				if (copySuccess) {
					toast.success("Copied to clipboard!")
				}
			})
			.catch((err) => {
				setCopySuccess(false);
			});
	};

	return { copySuccess, copyToClipboard };
};

export default useClipboard;
