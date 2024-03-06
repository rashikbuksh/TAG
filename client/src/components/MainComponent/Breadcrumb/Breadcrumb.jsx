import PropTypes from "prop-types";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Breadcrumb = ({ pageTitle, prevUrl }) => {
	return (
		<div className="breadcrumb-area bg-color--grey space-y--15 mt-14">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-3">
						<Link
							to={import.meta.env.VITE_API_PUBLIC_URL + prevUrl}
							className="back-link"
						>
							{" "}
							<FaAngleLeft /> Back
						</Link>
					</div>
					<div className="col-6">
						<h4 className="page-title text-center">{pageTitle}</h4>
					</div>
				</div>
			</div>
		</div>
	);
};

Breadcrumb.propTypes = {
	pageTitle: PropTypes.string,
	prevUrl: PropTypes.string,
};

export default Breadcrumb;
