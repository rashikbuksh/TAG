import PropTypes from "prop-types";
import React, { Fragment } from "react";

import { Footer, Header } from "@components";

const DefaultLayout = ({ children }) => {
	return (
		<Fragment>
			<Header />
			{children}
			<Footer />
		</Fragment>
	);
};

DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default DefaultLayout;
