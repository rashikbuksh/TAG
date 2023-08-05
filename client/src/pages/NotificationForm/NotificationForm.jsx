import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const NotificationForm = () => {
	const addNotificationScema = yup.object({
		id: yup
			.number("Id must be number")
			.transform((value) => (isNaN(value) ? undefined : value))
			.required("Category ID required"),
		notification_Content: yup.string().required("Category name required"),
		notification_date: yup
			.date("Invalid date format")
			.required("Notification date is required"),
	});
	const form = useForm({
		defaultValues: {
			id: "",
			notification_Content: "",
			notification_date: "",
		},
		resolver: yupResolver(addNotificationScema),
	});

	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const onSubmit = (data) => {
		console.log("FormData", data);
		console.log(errors);
	};
	return (
		<div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120 mt-3">
			{/* auth page header */}
			<div className="auth-page-header space-mb--50">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h3 className="auth-page-header__title">Welcome</h3>
							<p className="auth-page-header__text">
								Add Your Category
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* auth page body */}
			<div className="auth-page-body">
				<div className="container">
					<div className="row">
						<div className="col-12">
							{/* Auth form */}
							<div className="auth-form">
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="category_id">Id</label>
										<input
											{...register("id")}
											type="number"
											name="id"
											id="id"
											placeholder="Enter Id"
										/>
										<p className="text-danger">
											{errors.id?.message}
										</p>
									</div>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="category_name">
											notification_Content
										</label>
										<input
											{...register(
												"notification_Content"
											)}
											type="text"
											name="notification_Content"
											id="notification_Content"
											placeholder="Enter Notification Content"
										/>
										<p className="text-danger">
											{errors.category_id?.message}
										</p>
									</div>

									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="notification_date">
											Notification Date
										</label>
										<input
											{...register("notification_date")}
											type="date"
											name="notification_date"
											id="notification_date"
											placeholder="Enter notification_date"
										/>
										<p className="text-danger">
											{errors.category_url?.message}
										</p>
									</div>
									<button className="auth-form__button">
										Add Notification
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* auth page footer */}
		</div>
	);
};

export default NotificationForm;
