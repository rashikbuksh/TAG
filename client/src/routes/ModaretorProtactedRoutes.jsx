import LoadingPage from "@components/LoadingPage/LoadingPage";
import { useAuth } from "@context/auth";
import ModeratorPage from "@pages/ModaratorPage/ModeratorPage";
import { Navigate, Outlet } from "react-router-dom";
import { MODERATORS_ROUTES } from "../App";

export default function ModeratorProtactedRoutes() {
	const { signed, loading, user } = useAuth();
	if (loading) return <LoadingPage></LoadingPage>;

	if (!signed) return <Navigate to="/login" replace={true} />;

	// console.log("user in router", user);
	// console.log(window.location.pathname);
	// console.log("ADMIN_ROUTES", ADMIN_ROUTES);

	const checkPath = MODERATORS_ROUTES?.find(
		(route) =>
			route?.path || `${route?.path}/*` === window.location.pathname
	);
	console.log(checkPath);

	const haveAccess = checkPath?.access?.includes(user?.access);

	return haveAccess ? (
		<ModeratorPage></ModeratorPage>
	) : (
		"This is from moderator"
	);
}
