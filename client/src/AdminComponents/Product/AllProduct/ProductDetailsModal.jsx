import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { api } from "../../../lib/api";
import { toast } from "react-toastify";

const ProductDetailsModal = ({ isOpen, setIsOpen, product }) => {
    const [isEditActive, setIsEditActive] = useState(false);
    const [productName, setProductName] = useState(product.name);
    const [title, setTitle] = useState(product.title);
    const [productShortDescription, setProductShortDescription] = useState(
        product.short_description
    );
    const [productFullDescription, setProductFullDescription] = useState(
        product.full_description
    );

    useEffect(() => {
        // Reset the input fields when the product prop changes
        setProductName(product.name);
        setTitle(product.title);
        setProductShortDescription(product.short_description);
        setProductFullDescription(product.full_description);
    }, [product]);

    const id = product.id;

    const handleEdit = () => {
        setIsEditActive(!isEditActive); // Toggle the isEditActive state
    };

    const handleUpdate = () => {
        api
            .post(`/product/update_product/${id}`, {
                name: productName,
                short_description: productShortDescription,
                full_description: productFullDescription,
				title:title
            })
            .then((response) => {
                toast(response.data.message);
                if (response.status === 200) {
                    toast("Change seccess");
                    setIsEditActive(false); // Disable editing after successful update
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handelVarified = () => {
        api
            .post(`/product/update_varification/${id}`, {
                isVerified: "verified",
            })
            .then((response) => {
                toast(response.data.message);
                if (response.status === 200) {
                    toast("Change seccess");
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} fullWidth={true}>
            <div className="p-4 flex flex-col items-center">
                <div className="mb-4">
                    <img
                        className="w-auto h-48  rounded object-contain"
                        src={`${import.meta.env.VITE_APP_IMG_URL}/products/${product.image}`}
                        alt=""
                    />
                </div>
                <div className="flex justify-center items-center mb-4">
                    <div>
                        <button
                            onClick={handleEdit}
                            className="btn btn-success btn-sm mr-2"
                        >
                            {isEditActive ? "Cancel" : "Edit"}
                        </button>
                        {product.isVerified !== "verified" && (
                            <button
                                onClick={handelVarified}
                                className="btn btn-info btn-sm mr-2"
                            >
                                Verify
                            </button>
                        )}
                        <button className="btn btn-error btn-sm">Delete</button>
                    </div>
                    {isEditActive && (
                        <button
                            onClick={handleUpdate}
                            className="btn btn-success btn-sm"
                        >
                            Submit
                        </button>
                    )}
                </div>
                <div className="w-full">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="productName" className="font-bold mb-2">
                            Name:
                        </label>
                        <input
                            id="productName"
                            readOnly={!isEditActive}
                            className="input input-bordered input-md px-3 py-2"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="title" className="font-bold mb-2">
                            Title:
                        </label>
                        <input
                            id="title"
                            readOnly={!isEditActive}
                            className="input input-bordered input-md px-3 py-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="shortDescription" className="font-bold mb-2">
                            Short Description:
                        </label>
                        <input
                            id="shortDescription"
                            readOnly={!isEditActive}
                            className="input input-bordered input-md px-3 py-2"
                            value={productShortDescription}
                            onChange={(e) => setProductShortDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="fullDescription" className="font-bold mb-2">
                            Full Description:
                        </label>
                        <textarea
                            id="fullDescription"
                            readOnly={!isEditActive}
                            className="textarea textarea-bordered textarea-md px-3 py-2"
                            value={productFullDescription}
                            onChange={(e) => setProductFullDescription(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProductDetailsModal;
