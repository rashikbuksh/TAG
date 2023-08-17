/* eslint-disable no-mixed-spaces-and-tabs */
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const OrderSingle = () => {
  const navigate = useNavigate();
  const products = [
    {
      product_name: "Widget A",
      product_weight: "500g",
      product_quantity: 10,
      product_price: 19.99,
    },
    {
      product_name: "Gadget B",
      product_weight: "1kg",
      product_quantity: 5,
      product_price: 49.99,
    },
    {
      product_name: "Accessory C",
      product_weight: "200g",
      product_quantity: 15,
      product_price: 9.99,
    },
    {
      product_name: "Accessory C",
      product_weight: "200g",
      product_quantity: 15,
      product_price: 39.99,
    },
  ];
  const totalPrice = products.reduce(
    (accumulator, product) =>
      accumulator + product.product_quantity * product.product_price,
    0
  );
  const goBack = () => {
    navigate(-1); // Navigate back by -1 step
  };
  return (
    <div className=" md:w-[50%] mx-auto my-32 px-2">
      <div className="flex items-center ">
      <FaArrowLeft onClick={goBack} style={{ cursor: "pointer" }} />

      <h2 className="text-2xl text-center flex-grow">Order</h2>

      </div>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={Math.random()} className="odd:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {product.product_name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {product.product_weight}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <span className="flex items-center gap-3">
                    {" "}
                    <FaTimes></FaTimes> {product.product_quantity}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {Math.floor(product.product_quantity * product.product_price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="my-12 text-right">
          <p className="text-xl font-bold ">Total Price = {Math.floor(totalPrice)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSingle;
