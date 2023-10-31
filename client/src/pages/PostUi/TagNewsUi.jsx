/* eslint-disable react/prop-types */

import {
  FaClock,
  FaHeart,
  FaMapMarkerAlt,
  FaRegComment,
  FaShare,
  FaShoppingCart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
const TagNewsUi = ({ postData }) => {
  const { likeCount, commentCount, shareCount , PostContent,postimg} = postData;
  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const formattedDate = currentDate.toLocaleDateString();

  return (
    <div className="space-mb--20">
      <div className="bg-white border rounded-lg">
        <div className="px-4">
          <div className="flex items-center p-2" >
            <img
              src={
                import.meta.env.VITE_API_PUBLIC_URL +
                "/assets/img/Tag-logo-blue-get_50_50.png"
              }
              className="img-fluid"
              alt=""
            />
            <div className="flex-grow">
              <h1 className="text-3xl text-center font-bold">Tag News</h1>
              <p className="text-sm text-gray-500 text-center">
                {formattedTime}{" "}
                <span className="text-gray-400">{formattedDate}</span>
              </p>
            </div>
          </div>
          {/* <div className="divider"></div> */}
        </div>
        <div className="px-4">
        <p className="mb-3">{PostContent}</p>
        
        {
            postimg&&<img className="h-[300px] w-full" src={postimg} alt="" />
        }
          <hr className="my-2" />
          <div className="flex justify-between p-2">
            <div className="flex flex-col items-center justify-center">
              <div className="text-xs">
                <p className="text-sm">{likeCount} Likes</p>
              </div>
              <FaHeart className="text-red-500 text-lg" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-xs">
                <p className="text-sm">{commentCount} comments</p>
              </div>
              <FaRegComment className="text-lg" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-xs">
                <p className="text-sm">{shareCount} share</p>
              </div>
              <FaShare className="text-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagNewsUi;
