/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import MainProduct from "./MainProduct";

const ProductCart = ({product}) => {
  const {name,price}=product
  const profileImageUrl =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80";
  const storeName = "Nayen shop";
  const rating = 3;

//   const productName = "Bombay Sweets Ring Chips";
  // const productImage =
  //   "https://img.freepik.com/free-vector/realistic-chips-package_1284-34786.jpg?w=826&t=st=1691298851~exp=1691299451~hmac=f0f2f77684302248188778a32b0a8acd676af9a5e21ad7be5c15d05cbf5639c8";
  return (
    <div className=" w-[300px] border border-gray-100 mx-auto rounded-md">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center px-2 py-2">
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
                </div>
              </Link>
            </div>
          </div>
          <div className="">
            <Rating
              style={{ maxWidth: 75 }}
              readOnly
              orientation="horizontal"
              value={rating}
            />
          </div>
        </div>
      </div>
      <MainProduct product={product}></MainProduct>
    </div>
  );
};

export default ProductCart;
