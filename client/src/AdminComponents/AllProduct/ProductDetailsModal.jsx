import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import { api } from "../../lib/api";

const ProductDetailsModal = ({ isOpen, setIsOpen, product }) => {
  const [isEditActive, setIsEditActive] = useState(true);
  const [productName, setProductName] = useState(product.name);
  const [productShortDescription, setProductShortDescription] = useState(
    product.short_description
  );
  const [productFullDescription, setProductFullDescription] = useState(
    product.full_description
  );

  const handleEdit = () => {
    setIsEditActive(!isEditActive);
  };



  useEffect(() => {
    // Reset the input fields when the product prop changes
    setProductName(product.name);
    setProductShortDescription(product.short_description);
    setProductFullDescription(product.full_description);
  }, [product]);
  const id =product.id
  const handleUpdate = () => {
	api.post(`/product/update_product/${id}`, {
        name: productName,
        short_description:productShortDescription,
        full_description:productFullDescription,
    })
        .then((response) => {
            alert(response.data.message);
            if (response.status === 200) {
                alert("Change seccess");
            }
        })
        .catch((error) => {
            alert(error);
        });

  };
  const handelVarified=()=>{
    api.post(`/product/update_varification/${id}`, {
        isVerified: "verified",
    })
        .then((response) => {
            alert(response.data.message);
            if (response.status === 200) {
                alert("Change seccess");
            }
        })
        .catch((error) => {
            alert(error);
        });
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <div className="flex items-center justify-between">
          <img
            className="h-[200px] w-full rounded object-contain"
            src={`${import.meta.env.VITE_APP_IMG_URL}/${product.image}`}
            alt=""
          />
        </div>
        <div className="my-2 p-3">
          <div className="flex-flex-grow-1 flex gap-2">
            <button onClick={handleEdit} className="btn btn-success btn-sm">
              {isEditActive ? "Edit" : "Cancel"}
            </button>
            {product.isVerified === "verified" ? null : (
              <button className="btn btn-info btn-sm" onClick={handelVarified}>Verify</button>
            )}
            <button className="btn btn-error btn-sm">Delete</button>
          </div>
        </div>
        <div className="p-3">
          <p className="flex items-center gap-2 my-2">
            <span className="font-bold w-1/2">Name:</span>{" "}
            <input
              disabled={isEditActive}
              className="px-3 flex-grow py-2 input input-bordered input-md w-full max-w-xs"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </p>
          <p className="flex items-center gap-2 my-2 ">
            <span className="font-bold w-1/2">Short Description:</span>{" "}
            <input
              disabled={isEditActive}
              className="px-3 flex-grow py-2 input input-bordered input-md w-full max-w-xs"
              value={productShortDescription}
              onChange={(e) => setProductShortDescription(e.target.value)}
            />
          </p>
          <p className="flex items-center my-2">
            <span className="font-bold w-1/2">Full Description:</span>{" "}
            <textarea
              disabled={isEditActive}
              className="textarea textarea-bordered textarea-md w-full max-w-xs flex-grow"
              value={productFullDescription}
              onChange={(e) => setProductFullDescription(e.target.value)}
            />
          </p>
          {!isEditActive && (
            <button onClick={handleUpdate} className="btn btn-sm btn-success">
              Submit
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
