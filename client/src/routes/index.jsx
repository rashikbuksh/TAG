import { Footer, Header } from "@components";
import LoadingPage from "@components/LoadingPage/LoadingPage";
import Offcanvas from "@components/MainComponent/Header/Offcanvas";
import ShowCartIcon from "@components/ShowCartIcon/ShowCartIcon";
import { useAuth } from "@context/auth";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { PROTECTED_ROUTES } from "../App";

export default function ProtectedRoutes() {
	const { signed, loading, user } = useAuth();

	if (loading) return <LoadingPage></LoadingPage>;

	if (!signed) return <Navigate to="/login" replace={true} />;
	if (user && user.access === "new_shopper") {
		return <Navigate to="/waitForVerify" replace={true} />;
	}

	// console.log("user in router", user);
	// console.log(window.location.pathname);
	// console.log("protected", PROTECTED_ROUTES);

	const checkPath = PROTECTED_ROUTES?.find(
		(route) => route?.path || `${route?.path}/*` == window.location.pathname
	);

	const haveAccess = checkPath?.access?.includes(user?.access);

	return haveAccess ? (
		<>
			{/* <ShowCartIcon></ShowCartIcon> */}
			<Header />
			{/* <Offcanvas /> */}
			<Footer />
			<div className="p-2">
				<Outlet />
			</div>
		</>
	) : (
		<Navigate to="/no-access" replace={true} />
	);
}
