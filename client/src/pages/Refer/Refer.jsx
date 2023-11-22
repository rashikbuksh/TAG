import { useEffect, useState } from "react";
import * as Yup from "yup";
import Modal from "../../components/Modal/Modal";
import { useAuth } from "../../context/auth";
import { api } from "../../lib/api";

const Refer = () => {
	const [referStatus, setReferStatus] = useState("");
	const [haveReferCode, setHaveReferCode] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		referCode: "",
	});
	const refer_codeFromRg = localStorage.getItem("ref_c");
	// console.log(refer_codeFromRg);
	const { user } = useAuth();
	const validationSchema = Yup.object().shape({
		referCode: Yup.string().required("Refer code is required"),
	});

	const [isSubmitting, setIsSubmitting] = useState(false); // Added state for button disabling

	const handelModalOpen = () => {
		setIsOpen(!isOpen);
	};
	const handelHaveReferCodeChecked = (id) => {
		api.get(`/profile/check_refer_status/${id}`)
			.then((response) => {
				setReferStatus(response.data[0].refer_status);
				if (
					response.data[0].refer_status !== "referred" &&
					response.data[0].refer_status !== "unreferred"
				) {
					handelModalOpen();
				}
			})
			.catch((error) => {
				// alert(error);
			});
	};

	useEffect(() => {
		if (user) {
			const id = user.id;
			const refer_codeFromRg = localStorage.getItem("ref_c");
			if (refer_codeFromRg) {
				api.get(`/profile/get_refer_code`)
					.then((response) => {
						// console.log(response.data);
						const referCodes = response.data;
						const referredParsonId = referCodes.find(
							(code) => code.refer_code === refer_codeFromRg
						);
						// console.log(referredParsonId);
						if (referredParsonId) {
							api.post(`/profile/edit_refer_status/${id}`, {
								refer_status: "referred",
							})
								.then((response) => {
									// console.log(response.data);
									alert(response.data.message);
									if (response.status === 200) {
										alert("Change success");
										localStorage.removeItem("ref_c");
										api.post(`/add_refer`, {
											referred_by: referredParsonId.id,
											referred_to: user.id,
										})
											.then((response) => {
												// console.log(response.data);
												if (response.status === 200) {
													alert(
														"Added success to refer"
													);
													localStorage.removeItem(
														"ref_c"
													);

													// Close the modal when everything is successful
												}
											})
											.catch((error) => {
												// Re-enable the button if there's an error
												alert(error);
											});
									}
								})
								.catch((error) => {
									// Re-enable the button if there's an error
									alert(error);
								});
						} else {
							setError("Enter A Valid Refer code");
							alert("Invalid Refer code");
							localStorage.removeItem("ref_c");
							window.location.reload(true);
							// Re-enable the button if there's an error
							handelHaveReferCodeChecked(id);
						}
					})
					.catch((error) => {
						setIsSubmitting(false);
						handelHaveReferCodeChecked(id); // Re-enable the button if there's an error
						alert(error);
					});
			} else {
				handelHaveReferCodeChecked(id);
			}
		}
	}, [user]);

	const handelHaveNotReferCode = () => {
		setHaveReferCode(false);
		const id = user.id;
		setIsSubmitting(true); // Disable the button when clicked
		api.post(`/profile/edit_refer_status/${id}`, {
			refer_status: "unreferred",
		})
			.then((response) => {
				// alert(response.data.message);
				if (response.status === 200) {
					setIsOpen(false); // Close the modal when successful
				}
			})
			.catch((error) => {
				setIsSubmitting(false); // Re-enable the button if there's an error
				alert(error);
			});
	};

	const handelHaveReferCode = () => {
		setHaveReferCode(true);
	};

	const handelRefferCodeSubmit = () => {
		const id = user.id;
		setIsSubmitting(true); // Disable the button when clicked
		validationSchema
			.validate(formData, { abortEarly: false })
			.then(() => {
				api.get(`/profile/get_refer_code`)
					.then((response) => {
						// console.log(response.data);
						const referCodes = response.data;
						const referredParsonId = referCodes.find(
							(code) => code.refer_code === formData.referCode
						);
						// console.log(referredParsonId);
						if (referredParsonId) {
							api.post(`/profile/edit_refer_status/${id}`, {
								refer_status: "referred",
							})
								.then((response) => {
									// console.log(response.data);
									// alert(response.data.message);
									if (response.status === 200) {
										alert("Change success");
										api.post(`/add_refer`, {
											referred_by: referredParsonId.id,
											referred_to: user.id,
										})
											.then((response) => {
												// console.log(response.data);
												if (response.status === 200) {
													alert(
														"Added success to refer"
													);
													setIsOpen(false); // Close the modal when everything is successful
												}
											})
											.catch((error) => {
												setIsSubmitting(false); // Re-enable the button if there's an error
												alert(error);
											});
									}
								})
								.catch((error) => {
									setIsSubmitting(false); // Re-enable the button if there's an error
									alert(error);
								});
						} else {
							setError("Enter A Valid Refer code");
							setIsSubmitting(false); // Re-enable the button if there's an error
						}
					})
					.catch((error) => {
						setIsSubmitting(false); // Re-enable the button if there's an error
						alert(error);
					});
			})
			.catch((errors) => {
				const validationErrors = {};
				errors.inner.forEach((error) => {
					validationErrors[error.path] = error.message;
				});
				setFormData({ ...formData, errors: validationErrors });
				setIsSubmitting(false); // Re-enable the button if there's an error
			});
	};

	return (
		<>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} title={"Must select Yes or No"}  showCross={true}>
				<p className="primary-text "></p>
				<div className="flex items-center justify-center space-x-11 p-2">
					<p className="text-black">Do you have any refer code?</p>
					<button
						onClick={handelHaveReferCode}
						className="btn btn-xs btn-accent"
					>
						Yes
					</button>
					<button
						onClick={handelHaveNotReferCode}
						disabled={isSubmitting}
						className="btn btn-xs btn-error"
					>
						No
					</button>
				</div>
				{haveReferCode && (
					<div className="flex flex-col items-center justify-center">
						<input
							type="text"
							placeholder="Type here"
							className="input input-bordered input-sm w-full max-w-xs"
							name="referCode"
							value={formData.referCode}
							onChange={(e) =>
								setFormData({
									...formData,
									referCode: e.target.value,
								})
							}
						/>
						{formData.errors && formData.errors.referCode && (
							<p className="text-red-500">
								{formData.errors.referCode}
							</p>
						)}
						<button
							onClick={handelRefferCodeSubmit}
							className="btn btn-primary mt-2"
							disabled={isSubmitting} // Disable the button if isSubmitting is true
						>
							Submit
						</button>
						{error && <p className="text-error">{error}</p>}
					</div>
				)}
			</Modal>
		</>
	);
};

export default Refer;
