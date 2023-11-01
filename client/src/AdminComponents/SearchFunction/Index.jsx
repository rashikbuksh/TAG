import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const SearchFunction = ({ arr, setFilteredArr,width }) => {
	const [trimmedValue, setTrimmedValue] = useState("");

	const handleSearchChange = (value) => {
		// Remove leading and trailing whitespace and check if the resulting string is not empty
		setTrimmedValue(value.trim());
	};

	useEffect(() => {
		// Filter products when trimmedValue changes
		if (!trimmedValue) {
			setFilteredArr(arr); // No filtering needed
		} else {
			const filtered = arr.filter(
				(ar) =>
					(ar.name &&
						ar.name
							.toLowerCase()
							.includes(trimmedValue.toLowerCase())) ||
					(ar.email &&
						ar.email
							.toLowerCase()
							.includes(trimmedValue.toLowerCase())) ||
					(ar.phone && ar.phone.includes(trimmedValue))
			);
			setFilteredArr(filtered);
		}
	}, [trimmedValue, arr, setFilteredArr]);
	return (
		<div className={`mx-auto ${width?"w-full":"w-1/2"}  p-6`}>
			<label className="sr-only">Search</label>
			<input
				type="text"
				id="Search"
				placeholder="Search for..."
				className="w-full rounded-md border-gray-200 px-2 py-2.5 pe-10 shadow-sm sm:text-sm"
				onChange={(e) => handleSearchChange(e.target.value)}
			/>
		</div>
	);
};

// Prop validation
SearchFunction.propTypes = {
	arr: PropTypes.array.isRequired,
	setFilteredArr: PropTypes.func.isRequired,
};

export default SearchFunction;
