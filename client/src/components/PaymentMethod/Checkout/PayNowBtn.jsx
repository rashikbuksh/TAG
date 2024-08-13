const PayNowBtn = ({ handelGoPaymentPage, paymentOperator }) => {
	const buttonText =
		paymentOperator === "Cash On Pickup" ||
		paymentOperator === "Cash On Delivery"
			? "Next"
			: "Pay Now";

	return (
		<div className="mt-3 flex justify-center">
			<button onClick={handelGoPaymentPage} className="auth-btn">
				{buttonText}
			</button>
		</div>
	);
};

export default PayNowBtn;
