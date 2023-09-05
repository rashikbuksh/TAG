import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Axios from "axios";

function Offcanvas(props) {
	const user = localStorage.getItem("user-id");
	const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const offcanvasNavigations = document.querySelectorAll(
      ".offcanvas-navigation > li"
    );
    offcanvasNavigations.forEach((single) => {
      single.addEventListener("click", () => {
        props.activeStatus(false);
      });
    });
	if (user) {
		Axios.get(`${import.meta.env.VITE_APP_API_URL}/auth/getUserInfo/${user}`)
			.then((res) => {
				setUserInfo(res.data);
			}
		);
	}
  }, [props]);

  return (
    <div key={Math.random()} className={`offcanvas-menu ${props.show ? "active" : ""}`}>
		{userInfo.map((item) => (
      <div className="profile-card text-center">
        <div className="profile-card__image space-mb--10">
          <img
            src={
				item.image
				  ? `${import.meta.env.VITE_APP_IMG_URL}/user/${item.image}`
				  : `${import.meta.env.VITE_API_PUBLIC_URL + "/assets/img/profile.jpg"}`
			  }
            className="img-fluid"
            alt=""
          />
        </div>
        <div className="profile-card__content">
          <p className="name text-lg">
		  {item.name ? item.name : "Guest"} <span className="id"> ID:  {user ? user : "Guest"}</span>
          </p>
        </div>
      </div>
		))
	  }
      <div className="offcanvas-navigation-wrapper space-mt--40">
        <ul className="offcanvas-navigation">
          
          <li>
							<span className="icon">
								<ReactSVG
									src={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/assets/img/icons/profile-two.svg"
									}
								/>
							</span>
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/profile"
								}
							>
								My Profile
							</Link>
						</li>
						<li>
							<span className="icon">
								<ReactSVG
									src={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/assets/img/icons/notification.svg"
									}
								/>
							</span>
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/notification"
								}
							>
								Notification
							</Link>
						</li>
						<li>
							<span className="icon">
								<ReactSVG
									src={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/assets/img/icons/product.svg"
									}
								/>
							</span>
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/shop"
								}
							>
								All products
							</Link>
						</li>
						<li>
							<span className="icon">
								<ReactSVG
									src={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/assets/img/icons/cart-two.svg"
									}
								/>
							</span>
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/order"
								}
							>
								My Order
							</Link>
						</li>
						<li>
							<span className="icon">
								<ReactSVG
									src={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/assets/img/icons/cart-three.svg"
									}
								/>
							</span>
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/cart"
								}
							>
								Cart
							</Link>
						</li>
						<li>
							<span className="icon">
								<ReactSVG
									src={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/assets/img/icons/wishlist.svg"
									}
								/>
							</span>
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/wishlist"
								}
							>
								Wishlist
							</Link>
						</li>
						<li>
							<span className="icon">
								<ReactSVG
									src={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/assets/img/icons/gear-two.svg"
									}
								/>
							</span>
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/edit-profile"
								}
							>
								Settings
							</Link>
						</li>
						<li>
							<span className="icon">
								<ReactSVG
									src={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/assets/img/icons/profile.svg"
									}
								/>
							</span>
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/contact"
								}
							>
								Contact Us
							</Link>
						</li>
						<li>
            <span className="icon">
              <ReactSVG
                src={
					import.meta.env.VITE_API_PUBLIC_URL +
					"/assets/img/icons/profile.svg"
				  }
              />
            </span>
			<Link
              to={import.meta.env.VITE_API_PUBLIC_URL + "/login"}
            >
              Login / Sign up
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Offcanvas;