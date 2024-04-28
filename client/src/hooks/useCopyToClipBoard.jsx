import { useState } from "react";

const useClipboard = () => {
	const [copySuccess, setCopySuccess] = useState(null);

	const copyToClipboard = (text) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setCopySuccess("Copied to clipboard!");
			})
			.catch((err) => {
				setCopySuccess("Copy failed: " + err);
			});
	};

	return { copySuccess, copyToClipboard };
};

export default useClipboard;
