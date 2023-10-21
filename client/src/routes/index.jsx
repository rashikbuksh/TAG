import { Navigate, Outlet, useParams } from "react-router-dom";
import { PROTECTED_ROUTES } from "../App";
import { Footer, Header } from "../components";
import Offcanvas from "../components/Header/Offcanvas";
import { useAuth } from "../context/auth";
import LoadingPage from "../components/LodingPage/LoadingPage";

export default function ProtectedRoutes() {
	const { signed, loading, user } = useAuth();

	if (loading)
		return <LoadingPage></LoadingPage>;

	if (!signed) return <Navigate to="/login" replace={true} />;

	// console.log("user in router", user);
	// console.log(window.location.pathname);
	// console.log("protected", PROTECTED_ROUTES);

	const checkPath = PROTECTED_ROUTES?.find(
		(route) => route?.path||`${route?.path}/*` == window.location.pathname
	);

	const haveAccess = checkPath?.access?.includes(user?.access);

	return haveAccess ? (
		<>
			<Header />
			{/* <Offcanvas /> */}
			<Footer />
			<Outlet />
		</>
	) : (
		<Navigate to="/no-access" replace={true} />
	);
}
