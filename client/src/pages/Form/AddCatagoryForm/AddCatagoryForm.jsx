import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@lib/api";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const AddcategoryForm = () => {
	const [category, setCategory] = useState([]);
	const addcategoryScema = yup.object({
		category_name: yup.string().required("Category name required"),
		category_url: yup.string().url("Invalid URL format"),
	});
	const form = useForm({
		defaultValues: {
			category_name: "",
			category_url: "",
		},
		resolver: yupResolver(addcategoryScema),
	});

	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const onSubmit = async (data) => {
		api.post(`/category/add-category`, {
			name: data.category_name,
			url: data.category_url,
		}).then((response) => {
			if (
				response.data.message ===
				data.category_name + " added successfully"
			) {
				toast("Category Added Successful");
				setCategory([
					...category,
					{ name: data.category_name, url: data.category_url },
				]);
			}
		});
	};
	useEffect(() => {
		api.get(`/category/get-category`).then((response) => {
			setCategory(response.data);
		});
	}, []);
	return (
		<div className="   mt-3 rounded-md">
			{/* auth page header */}
			<div className=" space-mb--50">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h3 className="auth-page-header__title">
								Add Category
							</h3>
							<p className="auth-page-header__text">
								Add Product Category
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* auth page body */}

			<div className="auth-page-body  rounded-md">
				<div className="container rounded-md">
					<div className="row">
						<div className="col-12">
							{/* Auth form */}
							<div className="auth-form">
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="category_name">
											Category Name
										</label>
										<input
											{...register("category_name")}
											type="text"
											name="category_name"
											id="category_name"
											placeholder="Enter category Name"
										/>
										<p className="text-danger">
											{errors.category_id?.message}
										</p>
									</div>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="category_url">
											Category url
										</label>
										<input
											{...register("category_url")}
											type="url"
											name="category_url"
											id="category_url"
											placeholder="Enter category Picture"
										/>
										<p className="text-danger">
											{errors.category_url?.message}
										</p>
									</div>
									<button className="auth-form__button">
										Add Category
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="mx-auto my-3 grid w-[90%] grid-cols-7 gap-3  bg-gray-200 p-10">
					{category.map((categoryData) => (
						<p
							className="rounded bg-white px-4 py-2"
							key={categoryData.id}
						>
							{categoryData.name}{" "}
							{/* Use categoryData instead of category */}
						</p>
					))}
				</div>
			</div>
			{/* auth page footer */}
		</div>
	);
};

export default AddcategoryForm;
