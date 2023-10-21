import { Navigate, Outlet } from "react-router-dom";
import { ADMIN_ROUTES } from "../App";
import { useAuth } from "../context/auth";
import Admin from "../pages/AdminPage/Admin";
import LoadingPage from "../components/LodingPage/LoadingPage";

export default function AdminProtactedRoutes() {
	const { signed, loading, user } = useAuth();

	if (loading)
		return <LoadingPage></LoadingPage>;

	if (!signed) return <Navigate to="/login" replace={true} />;

	// console.log("user in router", user);
	// console.log(window.location.pathname);
	// console.log("ADMIN_ROUTES", ADMIN_ROUTES);

	const checkPath = ADMIN_ROUTES?.find(
		(route) => route?.path||`${route?.path}/*` === window.location.pathname
	);

	const haveAccess = checkPath?.access?.includes(user?.access);

	return haveAccess ? (
		<Admin></Admin>
	) : (
		<Navigate to="/no-access" replace={true} />
	);
}
