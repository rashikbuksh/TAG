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

import MainProduct from "../../components/ProductCart/MainProduct";

const PostUi = ({ postData }) => {
  const {
    profileImageUrl,
    storeName,
    storeUsername,
    discountText,
    durationText,
    locationText,
    likeCount,
    commentCount,
    shareCount,
    rating,
    productImage,
    productTitle,
  } = postData;
  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const formattedDate = currentDate.toLocaleDateString();

  return (
    <div className="space-mb--20">
      <div className="bg-white border rounded-lg">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <img
                className="w-10 h-10 rounded-full"
                src={profileImageUrl}
                alt=""
              />
              <div>
                <Link
                  to={
                    import.meta.env.VITE_API_PUBLIC_URL +
                    `/product/${Math.random()}`
                  }
                >
                  <div className="flex">
                    <h4 className="text-lg font-semibold">{storeName}</h4>
                    <p className="text-gray-500 ml-1">{storeUsername}</p>
                  </div>
                </Link>
                <p className="text-sm text-gray-500">
                  {formattedTime}{" "}
                  <span className="text-gray-400">{formattedDate}</span>
                </p>
              </div>
            </div>
            <div className="">
              <Rating
                style={{ maxWidth: 150 }}
                readOnly
                orientation="horizontal"
                value={rating}
              />
            </div>
          </div>
        </div>
        {productImage && (
          <MainProduct
            productImage={productImage}
            storeName={storeName}
            productName={productTitle}
          ></MainProduct>
        )}

        <div className="px-4 py-2">
          <div className="mb-4">
            {productImage ? (
              ""
            ) : (
              <>
                {" "}
                <p className="text-sm">
                  <span className="text-primary">
                    <FaShoppingCart className="inline-block align-text-top" />
                  </span>{" "}
                  {discountText}
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-primary">
                    <FaClock className="inline-block align-text-top" />
                  </span>{" "}
                  {durationText}
                </p>
                <p className="text-sm">
                  <span className="text-primary">
                    <FaMapMarkerAlt className="inline-block align-text-top" />
                  </span>{" "}
                  {locationText}
                </p>
              </>
            )}
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
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

export default PostUi;
