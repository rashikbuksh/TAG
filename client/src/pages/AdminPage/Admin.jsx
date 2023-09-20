import React from "react";
import { ReactSVG } from "react-svg";

const Admin = () => {
	return (
		<div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120 mt-20">
			<div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120">
				{/* auth page header */}
				<div className="auth-page-header space-mb--50">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<h3 className="auth-page-header__title">
									Admin Only Pages
								</h3>
							</div>
						</div>
					</div>
				</div>
				{/* auth page body */}

				{/* All Admin page routes */}

				<div className="auth-page-body mt-20">
					<div className="container">
						<div className="row">
							<div className="col">
								<a href="/addcategory">
									<button className="btn-fill-out btn-addtocart space-ml--10 btn">
										Add Catagory
									</button>
								</a>
							</div>
							<div className="divider"></div>
							<div>
								<a href="/addproduct">
									<button className="btn-fill-out btn-addtocart space-ml--10 btn">
										Add Product
									</button>
								</a>
							</div>
							<div className="divider"></div>
							<div>
								<a href="/addheroslider">
									<button className="btn-fill-out btn-addtocart space-ml--10 btn">
										Add Hero Slider
									</button>
								</a>
							</div>
							<div className="divider"></div>
						</div>
					</div>
				</div>

				{/* auth page footer */}
				<div className="auth-page-footer mt-20">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<p className="auth-page-footer__text">
									&copy; {new Date().getFullYear()}{" "}
									<a href="" target="_blank" rel="noreferrer">
										<u>Think And Get</u>
									</a>
									. All Rights Reserved.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Admin;
