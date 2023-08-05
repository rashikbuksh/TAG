import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const HeroSlider = () => {
	const addHeroSliderScema = yup.object({
		id: yup
			.number("Id must be number")
			.transform((value) => (isNaN(value) ? undefined : value))
			.required("Category ID required"),
		title: yup.string().required("Category name required"),
		subTitle: yup.string().required("Category name required"),
		image: yup
			.mixed()
			.required("Category Picture is required")
			.test("fileFormat", "Invalid file format", (value) => {
				if (value && value.length) {
					const file = value[0];
					return file && file.type.includes("image");
				}
				return false;
			}),
	});
	const form = useForm({
		defaultValues: {
			id: "",
			title: "",
			subTitle: "",
			image: "",
		},
		resolver: yupResolver(addHeroSliderScema),
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
										<label htmlFor="id">Id</label>
										<input
											{...register("id")}
											type="number"
											name="id"
											id="id"
											placeholder="Id"
										/>
										<p className="text-danger">
											{errors.id?.message}
										</p>
									</div>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="title">Title</label>
										<input
											{...register("title")}
											type="text"
											name="title"
											id="title"
											placeholder="Enter Title"
										/>
										<p className="text-danger">
											{errors.title?.message}
										</p>
									</div>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="subTitle">
											SubTitle
										</label>
										<input
											{...register("subTitle")}
											type="text"
											name="subTitle"
											id="subTitle"
											placeholder="Enter subTitle"
										/>
										<p className="text-danger">
											{errors.subTitle?.message}
										</p>
									</div>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="category_picture">
											Image
										</label>
										<input
											{...register("image")}
											type="file"
											name="image"
											id="image"
											placeholder="Enter image"
										/>
										<p className="text-danger">
											{errors.category_picture?.message}
										</p>
									</div>
									<button className="auth-form__button">
										Hero Slider
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

export default HeroSlider;
