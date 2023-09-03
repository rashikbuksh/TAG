import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const HeroSlider = () => {
	const [sliderData, setSliderData] = useState([]);
	const addHeroSliderScema = yup.object({
		title: yup.string().required("Title required"),
		subtitle: yup.string().required("Sub Title required"),
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
		console.log(new Date());
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
					},
				}
			).then((response) => {
				console.log(response.data);
				if (response.data.msg === "File Uploaded") {
					ImageName = response.data.productImage;
				}
			});
		}
		Axios.post(`${import.meta.env.VITE_APP_API_URL}/heroslider/addslider`, {
			title: data.title,
			subtitle: data.subtitle,
			image: ImageName,
		}).then((response) => {
			console.log(response.data);
			if (response.data.message == title + " Added Successful") {
				alert("Slider Added Successful");
			}
		});
	};

	useEffect(() => {
		Axios.get(`${import.meta.env.VITE_APP_API_URL}/heroslider/getslider`)
			.then((res) => {
				setSliderData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	async function deleteSlider(id) {
		console.log(id);
		await Axios.post(
			`${import.meta.env.VITE_APP_API_URL}/heroslider/deleteslider/${id}`
		).then((response) => {
			console.log(response.data);
			if (response.data.message == id + " Deleted Successful") {
				alert("Slider Deleted Successful");
			}
		});
	}

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
										<label htmlFor="category_picture">
											Image
										</label>
										<input
											{...register("image")}
											type="file"
											name="image"
											id="image"
											placeholder="Enter image"
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
			<div className="auth-page-body">
				<div className="container">
					<div className="row">
						<div className="col-12">
							{/* Auth form */}
							<div className="auth-form">
							{!!sliderData.length && sliderData.map((single) => (
								
								<div key={single.id}>
									<button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ml-auto flex justify-end" onClick={() => deleteSlider(single.id)}>
											Delete
										</button>
									<div className="auth-form__single-field space-mb--30">
										{single.title}
									</div>
									<div className="auth-form__single-field space-mb--30">
										{single.subtitle}
									</div>
									<div className="auth-form__single-field space-mb--30">
									<img
										src={`${import.meta.env.VITE_APP_IMG_URL}/heroslider/${single.image}`}
											className="w-[200px]"
											alt="No Image"
									/>
									</div>
								</div>
							)
							)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSlider;
