import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
	return (
		<div className="welcome-slider-wrapper text-center">
			<div className="single-welcome-slide-wrapper">
				<div className="single-welcome-slide">
					<div className="single-welcome-slide__head">
						<div className="logo space-mb--15">
							<img 
								src={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/assets/img/logo.jpg"
								}
								className="img-fluid w-1/2"
								alt=""
							/>
							<Link
							to={import.meta.env.VITE_API_PUBLIC_URL + "/home"}
							className="btn btn-primary btn-xs"
						>
							CONTINUE
						</Link>
						<br />
						<Link
							to={import.meta.env.VITE_API_PUBLIC_URL + "/home"}
							className="skip-btn"
						>
							skip
						</Link>
						</div>
						
					</div>
					</div>
				</div>
			</div>

	);
};

export default Welcome;
