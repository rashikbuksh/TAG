const PayNowBtn = ({ handelGoPaymentPage }) => {
	return (
		<div className="flex justify-center mt-3">
			<button onClick={handelGoPaymentPage} className="auth-btn ">
				Pay Now
			</button>
		</div>
	);
};

export default PayNowBtn;
