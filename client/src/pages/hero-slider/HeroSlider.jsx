import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { api } from "../../lib/api";
const HeroSlider = () => {
	const [sliderData, setSliderData] = useState([]);
	const addHeroSliderScema = yup.object({
		title: yup.string().required("Title required"),
		subtitle: yup.string().required("Sub Title required"),
		slider_position: yup.string().required("Slider position required"),
		image: yup
			.mixed()
			.required("Picture is required")
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
			title: "",
			subtitle: "",
			image: "",
			slider_position: "",
		},
		resolver: yupResolver(addHeroSliderScema),
	});

	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const [file, setFile] = useState(null);

	const onSubmit = async (data) => {
		const formData = new FormData();
		formData.append("uploadFiles", file);

		var ImageName = null;
		// console.log(new Date());
		if (file === null) {
			ImageName = null;
		} else {
			await Axios.post(
				`${
					import.meta.env.VITE_APP_API_URL
				}/imageUpload/heroSliderImageUpload`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data;",
						Authorization: Cookies?.get("auth"),
					},
				}
			).then((response) => {
				// console.log(response.data);
				if (response.data.msg === "File Uploaded") {
					ImageName = response.data.productImage;
				}
			});
		}
		api.post(`/heroslider/addslider`, {
			title: data.title,
			subtitle: data.subtitle,
			slider_position:data.slider_position,
			image: ImageName,
		}).then((response) => {
			// console.log(response.data);
			if (response.data.message == title + " Added Successful") {
				alert("Slider Added Successful");
			}
		});
	};

	useEffect(() => {
		api.get(`/heroslider/getslider`)
			.then((res) => {
				setSliderData(res.data);
			})
			.catch((err) => {
				// console.log(err);
			});
	}, [sliderData]);

	async function deleteSlider(id) {
		// console.log(id);
		await api.delete(`/heroslider/deleteslider/${id}`).then((response) => {
			// console.log(response.data);
			if (response.data.message == id + " Deleted Successful") {
				alert("Slider Deleted Successful");
			}
		});
	}

	return (
		<div className="  space-pt--70 space-pb--120 mt-3">
			{/* auth page header */}
			<div className=" space-mb--50">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h3 className="auth-page-header__title">
								Add Slider Image
							</h3>
							<p className="auth-page-header__text"></p>
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
										<label htmlFor="subtitle">
											subtitle
										</label>
										<input
											{...register("subtitle")}
											type="text"
											name="subtitle"
											id="subtitle"
											placeholder="Enter subtitle"
										/>
										<p className="text-danger">
											{errors.subtitle?.message}
										</p>
									</div>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="slider_position">
											Slider Position
										</label>

										<br />
										<select
											{...register("slider_position")}
											defaultValue={"top"}
											className="select select-bordered w-full "
											placeholder="Enter Slider Position"
										>
											{/* <option>Select One</option> */}
											<option value="top" selected>Top</option>
											<option value="middel">
												Middel
											</option>
											<option value="bottom">
												Bottom
											</option>
										</select>
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
											className="file-input file-input-bordered file-input-success w-full "
											onChange={(e) => {
												setFile(e.target.files[0]);
											}}
										/>
										<p className="text-danger">
											{errors.category_picture?.message}
										</p>
									</div>
									<button className="auth-form__button">
										Add Hero Slider
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* auth page footer */}
			<div className="divider"></div>
			<h2 className="m-4 text-3xl">All Slider Photo </h2>
			<div className="auth-page-body">
				<div className="container">
					<div className="row">
						<div className="col-12">
							{/* Auth form */}
							<div className="auth-form grid grid-cols-3 gap-3">
								{!!sliderData.length &&
									sliderData.map((single) => (
										<div key={single.id} className="border p-2 rounded my-2">
											
											<div className="auth-form__single-field space-mb--30 flex gap-3">
											<p className="text-black">Slider title: </p>
												{single.title}
											</div>
											<div className="auth-form__single-field space-mb--30 flex gap-3">
											<p className="text-black">Slider subtitle: </p>
												{single.subtitle}
											</div>
											<div className="auth-form__single-field space-mb--30 flex gap-3">
												<p className="text-black">Slider Position: </p>
												{single.slider_position}
											</div>
											<div className="auth-form__single-field space-mb--30">
												<img
													src={`${
														import.meta.env
															.VITE_APP_IMG_URL
													}/heroslider/${
														single.image
													}`}
													className="w-[200px]"
													alt="No Image"
												/>
											</div>
											<button
												className="mb-2 ml-auto mr-2 flex justify-end rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
												onClick={() =>
													deleteSlider(single.id)
												}
											>
												Delete
											</button>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSlider;
