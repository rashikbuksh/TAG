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
  const [shopper, setShopper] = useState([]);
  var shopperInfo = [];

  useEffect(() => {
    Axios.get(import.meta.env.VITE_APP_API_URL + "/auth/getShopperInfo").then(
      (res) => {
        setShopper(res.data);
      }
    );
    console.log(cartItems);
    cartItems.sort((a, b) => {
      return a.shopper_id - b.shopper_id;
    });
  }, []);
  // console.log(shopper, "shopper");
  // console.log(cartItems, "cartItems");
  var current_id;

  return (
    <div className="my-32">
      <h1 className="text-3xl font-bold text-center">Cart</h1>
      <div className="divider"></div>
      {/* reapitable component  */}
      <div className="w-[90%] mx-auto border p-3">
        {/* Shop info components  */}
        <div className="my-4">
          <div className="flex items-center gap-6">
            <h3 className="text-base">{"#Shop id"}</h3>
            <h3 className="text-xl font-bold">{"Shop Name"}</h3>
          </div>
          <div>
            <div className="border p-2 flex justify-between items-center">
              <div>
                <h1 className="text-base font-bold">{"product name"}</h1>
                <div className="">
                  <h2 className="text-xs">{"product Weight"}</h2>
                  <div className="cart-product__counter">
                    <div className="cart-plus-minus">
                      <button
                        className="dec qtybutton"
                        // onClick={() => dispatch(decreaseQuantity(cartItem))}
                      >
                        -
                      </button>
                      <input
                        className="cart-plus-minus-box"
                        type="text"
                        // value={cartItem.quantity}
                        readOnly
                      />
                      <button
                        className="inc qtybutton"
                        // onClick={() =>
                        //   dispatch(
                        //     increaseQuantity({
                        //       cartItem,
                        //       quantity: cartItem.quantity,
                        //     })
                        //   )
                        // }
                        // disabled={
                        //   cartItem !== undefined &&
                        //   cartItem.quantity &&
                        //   cartItem.quantity >= cartItemStock(cartItem)
                        // }
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
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Cart;

{
  /* <div className="cart-product border-bottom--medium" key={key}>
                    <div>
                      {shopperInfo.map((shopper, key) => (
                        <div key={shopper.id} className="">
                          <div className="flex items-center justify-between">
                            <div className="flex gap-3 items-center px-2 py-2">
                              <Link
                                to={
                                  import.meta.env.VITE_API_PUBLIC_URL +
                                  `/shopkeeperProfileCV/${shopper.id}`
                                }
                              >
                                <img
                                  className="w-10 h-10 rounded-full"
                                  src={
                                    import.meta.env.VITE_APP_IMG_URL +
                                    "/" +
                                    shopper?.image
                                  }
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div>
                              <Link
                                to={
                                  import.meta.env.VITE_API_PUBLIC_URL +
                                  `/shopkeeperProfileCV/${shopper.id}`
                                }
                              >
                                <div className="flex">
                                  <h4 className="text-lg font-semibold">
                                    {shopper.name}
                                  </h4>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="cart-product__image">
                      <Link
                        to={
                          import.meta.env.VITE_API_PUBLIC_URL +
                          `/product/${cartItem.id}`
                        }
                      >
                        <img
                          src={
                            import.meta.env.VITE_APP_IMG_URL +
                            "/" +
                            cartItem.image
                          }
                          className="img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="cart-product__content">
                      <h3 className="title">
                        <Link
                          to={
                            import.meta.env.VITE_API_PUBLIC_URL +
                            `/product/${cartItem.id}`
                          }
                        >
                          {cartItem.name}
                        </Link>
                      </h3>
                      <div className="price">
                        {cartItem.discount && cartItem.discount > 0 ? (
                          <Fragment>
                            <span className="main-price me-1">{`$${cartItem.price}`}</span>
                            <span className="discounted-price">{`$${getDiscountPrice(
                              cartItem.price,
                              cartItem.discount
                            )}`}</span>
                          </Fragment>
                        ) : (
                          <span className="discounted-price">{`$${cartItem.price}`}</span>
                        )}
                      </div>
                    </div>
                    <div className="cart-product__counter">
                      <div className="cart-plus-minus">
                        <button
                          className="dec qtybutton"
                          onClick={() => dispatch(decreaseQuantity(cartItem))}
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
                            cartItem.quantity >= cartItemStock(cartItem)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div> */
}

{
  /* <div>
{shopper && (
  <div className="body-wrapper space-pt--70 space-pb--120">
	<Breadcrumb pageTitle="Cart" prevUrl="/home" />

	{cartItems && cartItems.length >= 1 ? (
	  <Fragment>
		<div className="cart-product-area">
		  <div
			className="border border-gray-100 mx-3 px-3 py-2"
			key={cartItems.id}
		  >
			{cartItems.map((cartItem, key) => {
			  const discountedPrice = getDiscountPrice(
				cartItem.price,
				cartItem.discount
			  );

			  shopperInfo = shopper.filter(
				(shopper) => shopper.id == cartItem.shopper_id
			  );

			  discountedPrice != null
				? (cartTotalPrice += discountedPrice * cartItem.quantity)
				: (cartTotalPrice += cartItem.price * cartItem.quantity);

			  return (
				<>
				  <div className="border border-gray-100 mx-3 px-3 py-2">
					{shopperInfo.map((shopper, key) => {
					  console.log(shopper, "shopper");
					  if (shopper.id == cartItem.shopper_id) {
						// console.log(
						// 	current_id,
						// 	shopper.id,
						// 	shopper.id !=
						// 		current_id
						// );
						if (shopper.id != current_id) {
						  current_id = shopper.id;
						  // console.log(
						  // 	current_id,
						  // 	"current_id"
						  // );
						  return (
							<div key={shopper.id}>
							  <div
								key={shopper.id}
								className="flex items-center justify-between"
							  >
								<h4 className="text-lg font-semibold">
								  {" "}
								  {shopper.name}
								</h4>
								<FaX></FaX>
							  </div>
							  <div className="divider"></div>
							  <div className="flex gap-10  items-center">
								z <p className="">{cartItem.name}</p>
								<p>500lt</p>
								<div className="cart-product__counter">
								  <div className="cart-plus-minus">
									<button
									  className="dec qtybutton"
									  onClick={() =>
										dispatch(
										  decreaseQuantity(cartItem)
										)
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
								<div className="price">
								  {cartItem.discount &&
								  cartItem.discount > 0 ? (
									<Fragment>
									  <span className="discounted-price">{`$${getDiscountPrice(
										cartItem.price,
										cartItem.discount
									  )}`}</span>
									</Fragment>
								  ) : (
									<span className="discounted-price">{`$${cartItem.price}`}</span>
								  )}
								</div>
							  </div>
							</div>
						  );
						} else {
						  return (
							<div>
							  <div className="flex gap-10  items-center">
								<p className="">{cartItem.name}</p>
								<p>500lt</p>
								<div className="cart-product__counter">
								  <div className="cart-plus-minus">
									<button
									  className="dec qtybutton"
									  onClick={() =>
										dispatch(
										  decreaseQuantity(cartItem)
										)
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
								<div className="price">
								  {cartItem.discount &&
								  cartItem.discount > 0 ? (
									<Fragment>
									  <span className="discounted-price">{`$${getDiscountPrice(
										cartItem.price,
										cartItem.discount
									  )}`}</span>
									</Fragment>
								  ) : (
									<span className="discounted-price">{`$${cartItem.price}`}</span>
								  )}
								</div>
							  </div>
							</div>
						  );
						}
					  }
					})}
				  </div>
				</>
			  );
			})}
		  </div>
		</div>
		<div className="discount-code-wrapper space-mt--20">
		  <div className="container">
			<div className="row">
			  <div className="col-12">
				<div className="title-wrap">
				  <h4 className="cart-bottom-title">Use Coupon Code</h4>
				</div>
				<div className="discount-code">
				  <p>Enter your coupon code if you have one.</p>
				  <form>
					<input type="text" required name="name" />
					<button className="cart-btn-2" type="submit">
					  Apply Coupon
					</button>
				  </form>
				</div>
			  </div>
			</div>
		  </div>
		</div>
		<div className="grand-total space-mt--20">
		  <div className="container">
			<div className="row">
			  <div className="col-12">
				<div className="title-wrap">
				  <h4 className="cart-bottom-title">Cart Total</h4>
				</div>
				<h5>
				  Total price <span>${cartTotalPrice.toFixed(2)}</span>
				</h5>

				<h4 className="grand-total-title">
				  Grand Total <span>${cartTotalPrice.toFixed(2)}</span>
				</h4>
				<Link
				  to={import.meta.env.VITE_API_PUBLIC_URL + "/checkout"}
				>
				  Proceed to Checkout
				</Link>
			  </div>
			</div>
		  </div>
		</div>
	  </Fragment>
	) : (
	  <div className="no-items-found">
		<div className="no-items-found__image">
		  <ReactSVG
			src={
			  import.meta.env.VITE_API_PUBLIC_URL +
			  "/assets/img/icons/cart.svg"
			}
		  />
		</div>
		<div className="no-items-found__content">
		  <p>
			No Items in the cart.{" "}
			<Link to={import.meta.env.VITE_API_PUBLIC_URL + "/shop"}>
			  Add Some
			</Link>
		  </p>
		</div>
	  </div>
	)}
  </div>
)}
</div> */
}
