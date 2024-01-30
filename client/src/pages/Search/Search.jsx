import React from "react";
import { SearchProducts, Breadcrumb } from "../../components";

const Search = () => {
  return (
    <div className="body-wrapper  mt-10">
      <Breadcrumb pageTitle="Search Results" prevUrl="/home" />
      {/* search products */}
      <SearchProducts limit={20} />
    </div>
  );
};

export default Search;
