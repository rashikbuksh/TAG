import { Navigate, Outlet } from "react-router-dom";
import { PROTECTED_ROUTES } from "../App";
import { useAuth } from "../context/auth";

export default function ProtectedRoutes() {
	const { signed, loading, user } = useAuth();

	if (loading)
		return <span className="loading loading-dots loading-lg z-50" />;

	if (!signed) return <Navigate to="/login" replace={true} />;

	const haveAccess =
		user?.access &&
		PROTECTED_ROUTES?.find((route) =>
			route?.assigned.includes(user.access)
		);

	return haveAccess ? (
		<Outlet />
	) : (
		<Navigate to="/no-access" replace={true} />
	);
}
