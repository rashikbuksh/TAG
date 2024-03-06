import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="body-wrapper  ">
			<div className="no-items-found">
				<div className="no-items-found__image">
					<FaTimes />
				</div>
				<div className="no-items-found__content">
					<p>
						Nothing here
						<Link
							to={import.meta.env.VITE_API_PUBLIC_URL + "/home"}
						>
							Go back to homepage
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
