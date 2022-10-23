import { useRoutes } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import Forms from "./components/Forms/SignForms";
import UserPage from "./pages/User/UserPage";
import AdminPanel from "./pages/Admin/AdminPanel";
import CollectionsPage from "./pages/Collections/CollectionsPage";

export default function Router() {
	const router = useRoutes([
		{ path: "/", element: <HomePage /> },
		{ path: "/:userName", element: <UserPage /> },
		{ path: "/:userName/admin", element: <AdminPanel /> },
		{ path: "/:userName/:collectionName", element: <CollectionsPage /> },
	]);
	return router;
}
