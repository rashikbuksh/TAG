import { useState } from "react";
import { FaBars, FaFileContract, FaMapPin } from "react-icons/fa6";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { FaFontAwesomeFlag, FaHome } from "react-icons/fa";
const ShopKeeperDashBoard = () => {
  const shopname = "Rafi Edu Store";
  const locatiion = "New Market City Complex, Dhaka 1205";
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const mobileDrawerStyle = {
    width: "60%", // Adjust this value as needed for mobile
  };

  const desktopDrawerStyle = {
    width: "25%", // Adjust this value as needed for desktop
  };

  return (
    <>
      <div className="h-32 "></div>
      <div className="md:w-[50%] mx-auto bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className=" flex items-center gap-2 flex-col justify-center ">
            <div>
              <p className="font-bold text-sm lg:text-xl">Activity</p>
            </div>
            <input type="checkbox" className="toggle toggle-accent" />
          </div>
          <div>
            <button onClick={toggleDrawer}>
              <FaBars className="text-3xl"></FaBars>
            </button>
            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
              direction="right"
              style={
                window.innerWidth < 768 ? mobileDrawerStyle : desktopDrawerStyle
              }
            >
              <div className="pt-32">
                <div>
                  <ul className="offcanvas-navigation">
                    <li>
                      <span className="icon">
                        <ReactSVG
                          src={
                            import.meta.env.VITE_API_PUBLIC_URL +
                            "/assets/img/icons/profile.svg"
                          }
                        />
                      </span>
                      <Link to={import.meta.env.VITE_API_PUBLIC_URL + "/login"}>
                        Login / Sign up
                      </Link>
                    </li>
                    <li>
                      <span className="icon">
                        <FaHome></FaHome>
                      </span>
                      <Link to={import.meta.env.VITE_API_PUBLIC_URL + "/home"}>
                        Home
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
                        to={import.meta.env.VITE_API_PUBLIC_URL + "/contact"}
                      >
                        Contact Us
                      </Link>
                    </li>

                    <li>
                      <span className="icon">
                        <FaFileContract></FaFileContract>
                      </span>
                      <Link
                        to={import.meta.env.VITE_API_PUBLIC_URL + "/wishlist"}
                      >
                        Terms and Condition
                      </Link>
                    </li>
                    <li>
                      <span className="icon">
                        <FaFontAwesomeFlag></FaFontAwesomeFlag>
                      </span>
                      <Link
                        to={
                          import.meta.env.VITE_API_PUBLIC_URL + "/edit-profile"
                        }
                      >
                        Report
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
                          import.meta.env.VITE_API_PUBLIC_URL + "/edit-profile"
                        }
                      >
                        Settings
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
        <div className="my-10">
          <div className="flex items-center justify-center flex-col">
            <img
              className="h-[200px] w-[200px] rounded-full"
              src="https://img.freepik.com/free-vector/people-standing-store-queue_23-2148594615.jpg?w=1380&t=st=1691338675~exp=1691339275~hmac=f00912cda4fe496dab3007a5dd750d515926e3fcd71d77d27ff693258b4c5a1f"
              alt=""
            />
            <h1 className="text-2xl lg:text-4xl font-bold my-3">{shopname}</h1>
            <p className="flex items-center gap-2 text-sm lg:text-xl text-black">
              <FaMapPin></FaMapPin> {locatiion}
            </p>
          </div>
          <div className="divider"></div>
          <div className="flex gap-10">
            <div className="h-[100px] lg:h-[200px] w-[500px] rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center flex-col gap-2">
              <h1 className="text-2xl lg:text-4xl font-extrabold text-white">
                My Product
              </h1>
              <p className="font-semibold text-sm lg:text-xl">
                Toral Product : 300
              </p>
            </div>
            <div className=" h-[100px] lg:h-[200px] w-[500px] rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center flex-col gap-2">
              <h1 className="text-2xl lg:text-4xl font-extrabold text-white">
                Notification
              </h1>
              <p className="font-semibold text-sm lg:text-xl">3</p>
            </div>
          </div>
          <div className="flex gap-10 my-10">
            <div className="h-[100px] lg:h-[200px] w-[500px] rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center flex-col gap-2">
              <h1 className="text-2xl lg:text-4xl font-extrabold text-white">
                News
              </h1>
            </div>
            <div className="h-[100px] lg:h-[200px] w-[500px] rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center flex-col gap-2">
              <h1 className="text-2xl lg:text-4xl font-extrabold text-white">
                Order History
              </h1>
            </div>
          </div>
          <div className="flex gap-10 my-10">
            <div className="h-[100px] lg:h-[200px] w-[500px] rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center flex-col gap-2">
              <h1 className="text-2xl lg:text-4xl font-extrabold text-white text-center">
                Add Social Media
              </h1>
            </div>
            <div className="h-[100px] lg:h-[200px] w-[500px] rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center flex-col gap-2">
              <h1 className="text-2xl lg:text-4xl font-extrabold text-white">
                My Account
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="h-44 "></div>
    </>
  );
};

export default ShopKeeperDashBoard;
