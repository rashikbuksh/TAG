import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { FaCross, FaTimes } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { Breadcrumb } from "../../components";
import { cartItemStock, getDiscountPrice } from "../../helpers/product";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../store/slices/cart-slice";

const Cart = () => {
  let cartTotalPrice = 0;
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [shoppers, setShoppers] = useState([]); // Maintain an array of shoppers
  var shopperInfo = [];

  // Initialize a separate buy state for each shop
  const [buyStates, setBuyStates] = useState({});

  useEffect(() => {
    Axios.get(import.meta.env.VITE_APP_API_URL + "/auth/getShopperInfo").then(
      (res) => {
        setShoppers(res.data);
        // Initialize the buy states with default values (false for each shop)
        const initialBuyStates = {};
        res.data.forEach((shopper) => {
          initialBuyStates[shopper.id] = false;
        });
        setBuyStates(initialBuyStates);
      }
    );
  }, []);

  console.log(shoppers, "shoppers");
  console.log(cartItems, "cartItems");
  var current_id;

  const handleBuyClick = (shopperId) => {
    // Toggle the buy state for the specific shop
    setBuyStates((prevBuyStates) => ({
      ...prevBuyStates,
      [shopperId]: !prevBuyStates[shopperId],
    }));
  };

  return (
    <div className="my-32">
      <h1 className="text-3xl font-bold text-center">Cart</h1>
      <div className="divider"></div>
      {shoppers &&
        shoppers.map((shopper) => {
          return (
            <div key={shopper.id} className="w-[90%] mx-auto border p-3">
              {cartItems &&
                cartItems.map((cartItem, key) => {
                  if (cartItem.shopper_id === shopper.id) {
                    return (
                      <div key={cartItem.id} className="my-4">
                        <div className="flex items-center gap-6">
                          <h3 className="text-base">
                            <Link
                              to={
                                import.meta.env.VITE_API_PUBLIC_URL +
                                `/shopkeeperProfileCV/${shopper.id}`
                              }
                            >
                              {shopper.id}
                            </Link>
                          </h3>
                          <h3 className="text-xl font-bold">{shopper.name}</h3>
                        </div>
                        <div>
                          <div className="border p-2 flex justify-between items-center">
                            <div>
                              <h1 className="text-base font-bold">
                                <Link
                                  to={
                                    import.meta.env.VITE_API_PUBLIC_URL +
                                    `/product/${cartItem.id}`
                                  }
                                >
                                  {cartItem.name}
                                </Link>
                              </h1>
                              <div className="">
                                <h2 className="text-xs">{cartItem.weight}</h2>
                                <div className="cart-product__counter">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        dispatch(decreaseQuantity(cartItem))
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        dispatch(
                                          increaseQuantity({
                                            cartItem,
                                            quantity: cartItem.quantity,
                                          })
                                        )
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                          cartItemStock(cartItem)
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h2 className="text-xs">{"500 X 3"}</h2>
                            </div>

                            <div>
                              <h2 className="text-xs">{"250"}</h2>
                            </div>
                          </div>
                        </div>
                        <div className="border flex justify-between p-1 items-center">
                          {buyStates[shopper.id] ? (
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleBuyClick(shopper.id)}
                                className="bg-red-400 px-3 py-1"
                              >
                                Cancel
                              </button>{" "}
                              <div className="border px-3 py-1">
                                2 minutes remaining
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleBuyClick(shopper.id)}
                              className="bg-green-400 px-3 py-1"
                            >
                              Buy
                            </button>
                          )}

                          <div>{5455}</div>
                        </div>
                      </div>
                    );
                  } else {
                    return <div key={Math.random()}></div>;
                  }
                })}
            </div>
          );
        })}
    </div>
  );
};

export default Cart;
