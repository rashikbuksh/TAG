import { FaClock, FaHeart, FaMapMarkerAlt, FaRegComment, FaShare, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./postui.css";

const PostUi = ({ single }) => {
    return (
        <div className=" space-mb--20">
            <div className="bg-white border rounded-lg">
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-3 items-center">
                            <img
                                className="w-10 h-10 rounded-full"
                                src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=900&t=st=1684680589~exp=1684681189~hmac=cafa5607e920ec2467a85bab709d5276befd391f36b7a89409199f11f28d0bde"
                                alt=""
                            />
                            <div>
                                <Link
                                    to={
                                        import.meta.env.VITE_API_PUBLIC_URL +
                                        `/product/${single.id}`
                                    }
                                >
                                    <div className="flex">
                                        <h4 className="text-lg font-semibold">Rafi Store</h4>
                                        <p className="text-gray-500 ml-1">@rafiStore23</p>
                                    </div>
                                </Link>
                                <p className="text-sm text-gray-500">
                                    10:04 pm <span className="text-gray-400">5/3/2023</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FaStar className="text-warning text-lg me-1" />
                            <FaStar className="text-warning text-lg me-1" />
                            <FaStar className="text-warning text-lg me-1" />
                            <FaStar className="text-warning text-lg me-1" />
                            <FaStar className="text-warning text-lg" />
                        </div>
                    </div>
                </div>
                <div className="px-4 py-2">
                    <div className="mb-2">
                        <p className="text-sm">
                            <span className="text-primary">
                                <FaShoppingCart className="inline-block align-text-top" />
                            </span>{" "}
                            Discount Offer: 29% off on all purchases
                        </p>
                        <p className="mt-1 text-sm">
                            <span className="text-primary">
                                <FaClock className="inline-block align-text-top" />
                            </span>{" "}
                            Duration: This offer is valid from [start date] to [end date].
                        </p>
                        <p className="text-sm">
                            <span className="text-primary">
                                <FaMapMarkerAlt className="inline-block align-text-top" />
                            </span>{" "}
                            Location: Groceress Shop outlets nationwide
                        </p>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between">
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-xs">
                                <p className="text-sm">200 Likes</p>
                            </div>
                            <FaHeart className="text-red-500 text-lg" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-xs">
                                <p className="text-sm">30 comments</p>
                            </div>
                            <FaRegComment className="text-lg" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-xs">
                                <p className="text-sm">12 share</p>
                            </div>
                            <FaShare className="text-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostUi;
