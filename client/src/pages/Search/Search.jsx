import { Breadcrumb, Header, SearchProducts } from "@components";
import ShowCartIcon from "@components/ShowCartIcon/ShowCartIcon";

const Search = () => {
	return (
		<>
			<Header />
			<ShowCartIcon />
			<div className="body-wrapper  mt-16">
				<Breadcrumb pageTitle="Search Results" prevUrl="/home" />
				{/* search products */}
				<SearchProducts limit={20} />
			</div>
		</>
	);
};

export default Search;
