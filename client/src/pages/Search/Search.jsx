import { SearchProducts, Breadcrumb, Header } from "../../components";

const Search = () => {
	return (
		<>
		<Header/>
			<div className="body-wrapper  mt-16">
				<Breadcrumb pageTitle="Search Results" prevUrl="/home" />
				{/* search products */}
				<SearchProducts limit={20} />
			</div>
		</>
	);
};

export default Search;
