import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import AdminProductCart from "./AdminProductCart";

const AllProductAdmin = () => {
	const [products, setProduct] = useState([]);
	useEffect(() => {
		api.get(`/product/getallproduct`)
			.then((response) => {
				setProduct(response.data);
			})
			.catch((error) => {
				alert(error);
			});
	}, []);
	console.log(products);
    const handleSearchChange = (value) => {
        // Remove leading and trailing whitespace and check if the resulting string is not empty
        const trimmedValue = value.trim();
      
        if (trimmedValue) {
          api.get(`/product/getSearchedValue/${trimmedValue}`)
            .then((response) => {
              setProduct(response.data);
            })
            .catch((error) => {
              alert(error);
            });
        }
      };
	return (
		<>
			<div className="mx-auto  w-1/2 p-6">
				<label className="sr-only">Search</label>

				<input
					type="text"
					id="Search"
					placeholder="Search for..."
					className="w-full rounded-md border-gray-200 px-2 py-2.5 pe-10 shadow-sm sm:text-sm "
					onChange={(e) => handleSearchChange(e.target.value)}
				/>
			</div>
			<div className="  mx-12 h-[70vh] overflow-x-auto rounded-md ">
				<div className="z-0 overflow-x-auto">
					<table className=" table-responsive table rounded-md">
						{/* head */}
						<thead>
							<tr>
								<th>
									<label>
										<input
											type="checkbox"
											className="checkbox"
										/>
									</label>
								</th>
								<th>Image</th>
								<th>Id</th>
								<th>Name</th>
								{/* <th>Short Decription</th> */}
								{/* <th>Full Description</th> */}
								<th>Category id</th>
								<th>Varification Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{products &&
								products.map((product) => (
									<AdminProductCart
										key={product.id}
										product={product}
									></AdminProductCart>
								))}
							{/* <AdminProductCart></AdminProductCart> */}
						</tbody>
						{/* foot */}
					</table>
				</div>
			</div>
		</>
	);
};

export default AllProductAdmin;
