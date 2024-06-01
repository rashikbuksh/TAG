
import RequestProductTable from "./RequestProductTable";

const AdminProductRequest = () => {
	
	return (
		<div>
			<h1 className="my-6 text-center text-xl">Product Request</h1>
			<div className="overflow-x-auto rounded-md px-4">
				<RequestProductTable></RequestProductTable>
			</div>
		</div>
	);
};

export default AdminProductRequest;
