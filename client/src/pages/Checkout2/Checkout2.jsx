import { Breadcrumb } from "@components";
import DeliveryAddress from "@components/PaymentMethod/Checkout/DeliveryAddress";
import OrderSummery from "@components/PaymentMethod/Checkout/OrderSummery";
import PayNowBtn from "@components/PaymentMethod/Checkout/PayNowBtn";
import PaymentOparator from "@components/PaymentMethod/Checkout/PaymentOparator";
import { useAuth } from "@context/auth";
import { api } from "@lib/api";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Checkout2 = () => {
	const [addressArr, setAddressArr] = useState([]);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [customers_address_summary, setCustomers_address_summary] =
		useState(null);
	const [paymentOperator, setPaymentOperator] = useState(null);
	const { user } = useAuth();

	useEffect(() => {
		api.get(`/get-customer-address/${user.id}`)
			.then((response) => {
				setAddressArr(response.data);
			})
			.catch((error) => {
				toast.error(error);
			});
	}, []);
	const navigate = useNavigate();
	const location = useLocation();
	const { totalPrice, shopperId, discount, totalItem, shopperAccess } =
		location.state;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handelGoPaymentPage = useCallback(() => {
		if (
			selectedAddress &&
			paymentOperator &&
			totalPrice &&
			setCustomers_address_summary
		) {
			navigate("/cashOnDelivery", {
				state: {
					totalPrice: totalPrice,
					shopperId: shopperId,
					discount: discount,
					totalItem: totalItem,
					payment_type: paymentOperator,
					customers_address_details_id: selectedAddress,
					customers_address_summary: customers_address_summary,
				},
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "You must have to add address ",
			});
		}
	});
	useEffect(() => {
		if (selectedAddress === "Pick up") {
			handelGoPaymentPage();
		}
	}, [handelGoPaymentPage, selectedAddress]);
	return (
		<div className="mx-auto px-4 pb-24 text-black ">
			{/* Checkout Title */}
			<Breadcrumb pageTitle="Checkout" prevUrl="/cart"></Breadcrumb>
			{/* Delivery Address Section */}
			{shopperAccess === "shopper" && (
				<p className="my-1  font-bold text-red-500">
					You Must select pickup
				</p>
			)}
			<DeliveryAddress
				addressArr={addressArr}
				selectedAddress={selectedAddress}
				setSelectedAddress={setSelectedAddress}
				shopperAccess={shopperAccess}
				customers_address_summary={customers_address_summary}
				setCustomers_address_summary={setCustomers_address_summary}
			></DeliveryAddress>

			{shopperAccess === "shopper" && (
				<div
					className={`mt-2 flex h-[50px] w-full cursor-pointer items-center px-2 ${
						selectedAddress === "Pick up" ? "bg-gray-200" : ""
					}`}
					onClick={() => {
						const newAddressValue =
							selectedAddress === "Pick up" ? null : "Pick up";
						setSelectedAddress(newAddressValue);
						setCustomers_address_summary(newAddressValue);
					}}
				>
					<input
						type="checkbox"
						checked={selectedAddress === "Pick up"}
						onChange={() => null} // Disable checkbox interaction
						className="mr-4 h-5 w-5"
					/>
					<span className="ml-8 flex-auto text-[16px] font-bold">
						Pick up from shop
					</span>
				</div>
			)}

			<PaymentOparator
				paymentOperator={paymentOperator}
				setPaymentOperator={setPaymentOperator}
				shopperAccess={shopperAccess}
			></PaymentOparator>
			{totalPrice ? (
				<OrderSummery
					totalPrice={totalPrice}
					discount={discount}
					totalItem={totalItem}
					deliveryCharge={
						customers_address_summary == "Pick up" ? 0 : 20
					}
				></OrderSummery>
			) : (
				<div className="mt-32">No total price provided!</div>
			)}
			{/* Pay Now Button */}
			<PayNowBtn
				handelGoPaymentPage={handelGoPaymentPage}
				paymentOperator={paymentOperator}
			></PayNowBtn>
		</div>
	);
};

export default Checkout2;
