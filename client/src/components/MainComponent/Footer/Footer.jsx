import React from "react";
import { FaRegBell, FaRegNewspaper } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { DashBoardIcon } from "../../../SvgHub/Icons";
import { useAuth } from "../../../context/auth";

const Footer = () => {
	const { user } = useAuth();
	return (
		<footer>
			<div className="footer-nav-wrapper">
				<Link
					to={import.meta.env.VITE_API_PUBLIC_URL + "/home"}
					className="footer-nav-single"
				>
					<div className="menu-wrapper">
						<svg
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clipPath="url(#clip0_113_1463)">
								<path
									d="M10.25 18.25V14.75C10.25 14.1977 10.6977 13.75 11.25 13.75H13.75C14.3023 13.75 14.75 14.1977 14.75 14.75V18.25C14.75 19.3546 15.6454 20.25 16.75 20.25H19.75C20.3023 20.25 20.75 19.8023 20.75 19.25V9.77195C20.75 9.44492 20.5901 9.13855 20.3218 8.95155L13.0718 3.89852C12.7282 3.65905 12.2718 3.65905 11.9282 3.89852L4.67821 8.95155C4.40991 9.13855 4.25 9.44492 4.25 9.77195V19.25C4.25 19.8023 4.69772 20.25 5.25 20.25H8.25C9.35457 20.25 10.25 19.3546 10.25 18.25Z"
									stroke="#121331"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_113_1463">
									<rect
										width="24"
										height="24"
										fill="white"
										transform="translate(0.5)"
									/>
								</clipPath>
							</defs>
						</svg>
						<span>Home</span>
					</div>
				</Link>
				<Link
					to={import.meta.env.VITE_API_PUBLIC_URL + "/newsfeed"}
					className="footer-nav-single"
				>
					<div className="menu-wrapper">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clipPath="url(#clip0_304_23717)">
								<mask
									id="mask0_304_23717"
									style={{ maskType: "alpha" }}
									maskUnits="userSpaceOnUse"
									x="3"
									y="3"
									width="19"
									height="19"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M22 3H3V22H22V3ZM20.5 10H15.5V18C15.5 19.38 16.62 20.5 18 20.5C19.38 20.5 20.5 19.38 20.5 18V10Z"
										fill="#D9D9D9"
									/>
								</mask>
								<g mask="url(#mask0_304_23717)">
									<path
										d="M18 20.5H6.5C5.12 20.5 4 19.38 4 18V4H15.5V10L18 20.5Z"
										stroke="#121331"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</g>
								<path
									d="M15.5 10H20.5V18C20.5 19.38 19.38 20.5 18 20.5C16.62 20.5 15.5 19.38 15.5 18V10Z"
									stroke="#121331"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M12.5 7H7V10.5H12.5V7Z"
									stroke="#121331"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M7 13.5H12.5"
									stroke="#121331"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M7 16.5601H12.5"
									stroke="#121331"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_304_23717">
									<rect width="24" height="24" fill="white" />
								</clipPath>
							</defs>
						</svg>
						<span>News</span>
					</div>
				</Link>

				{user ? (
					user.access === "shopper" ? (
						<Link
							to={
								import.meta.env.VITE_API_PUBLIC_URL +
								"/shopkeeperDashboard"
							}
							className="footer-nav-single"
						>
							<div className="menu-wrapper">
								<DashBoardIcon></DashBoardIcon>
								<span>Dashboard</span>
							</div>
						</Link>
					) : (
						<Link
							to={import.meta.env.VITE_API_PUBLIC_URL + "/chat"}
							className="footer-nav-single"
						>
							<div className="menu-wrapper">
								<svg
									width="25"
									height="24"
									viewBox="0 0 25 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clipPath="url(#clip0_301_77)">
										<path
											d="M9.25 4.75H15.75C19.06 4.75 21.75 7.44 21.75 10.75V13.25C21.75 16.56 19.06 19.25 15.75 19.25H3.25V10.75C3.25 7.44 5.94 4.75 9.25 4.75Z"
											stroke="#121331"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<circle
											cx="8.5"
											cy="12"
											r="1"
											fill="#121331"
										/>
										<path
											d="M13.5 12C13.5 12.5523 13.0523 13 12.5 13C11.9477 13 11.5 12.5523 11.5 12C11.5 11.4477 11.9477 11 12.5 11C13.0523 11 13.5 11.4477 13.5 12Z"
											fill="#121331"
										/>
										<circle
											cx="16.5"
											cy="12"
											r="1"
											fill="#121331"
										/>
									</g>
									<defs>
										<clipPath id="clip0_301_77">
											<rect
												width="24"
												height="24"
												fill="white"
												transform="translate(0.5)"
											/>
										</clipPath>
									</defs>
								</svg>
								<span>Chat</span>
							</div>
						</Link>
					)
				) : (
					""
				)}
				<Link
					to={import.meta.env.VITE_API_PUBLIC_URL + "/notification"}
					className="footer-nav-single"
				>
					<div className="menu-wrapper">
						<svg
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clipPath="url(#clip0_113_1473)">
								<path
									d="M12.5 2.75V4.75"
									stroke="#121331"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M17.96 13.67L19.75 17.25H5.25L7.04 13.67C7.18 13.39 7.25 13.09 7.25 12.78V10C7.25 7.1 9.6 4.75 12.5 4.75C15.4 4.75 17.75 7.1 17.75 10V12.78C17.75 13.09 17.82 13.4 17.96 13.67Z"
									stroke="#121331"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M14.75 17.25V19C14.75 20.24 13.74 21.25 12.5 21.25C11.26 21.25 10.25 20.24 10.25 19V17.25"
									stroke="#121331"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_113_1473">
									<rect
										width="24"
										height="24"
										fill="white"
										transform="translate(0.5)"
									/>
								</clipPath>
							</defs>
						</svg>
						<span className="text-xs">Notification</span>
					</div>
				</Link>
				<Link
					to={import.meta.env.VITE_API_PUBLIC_URL + "/profile"}
					className="footer-nav-single"
				>
					<div className="menu-wrapper">
						<svg
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clipPath="url(#clip0_113_1397)">
								<path
									d="M12.5 21.25C17.6086 21.25 21.75 17.1086 21.75 12C21.75 6.89137 17.6086 2.75 12.5 2.75C7.39137 2.75 3.25 6.89137 3.25 12C3.25 17.1086 7.39137 21.25 12.5 21.25Z"
									stroke="#121331"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M6.44467 18.9926L6.61151 18.7616C7.41053 17.6553 8.69218 17 10.0568 17H14.9437C16.3085 17 17.5902 17.6554 18.3892 18.7618L18.5558 18.9925C18.9397 18.6597 19.2959 18.2959 19.6206 17.9048L19.6052 17.8836C18.5242 16.3867 16.7901 15.5 14.9437 15.5H10.0568C8.21054 15.5 6.47654 16.3866 5.39552 17.8833L5.37988 17.9049C5.70452 18.296 6.06075 18.6598 6.44467 18.9926Z"
									fill="#121331"
								/>
								<path
									d="M9.75 9C9.75 7.48122 10.9812 6.25 12.5 6.25V6.25C14.0188 6.25 15.25 7.48122 15.25 9V10.5C15.25 12.0188 14.0188 13.25 12.5 13.25V13.25C10.9812 13.25 9.75 12.0188 9.75 10.5V9Z"
									stroke="#121331"
									strokeWidth="1.5"
									strokeLinejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_113_1397">
									<rect
										width="24"
										height="24"
										fill="white"
										transform="translate(0.5)"
									/>
								</clipPath>
							</defs>
						</svg>
						<span>Profile</span>
					</div>
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
