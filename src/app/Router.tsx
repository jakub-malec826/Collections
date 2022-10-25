import { useRoutes } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import UserCollectionsPage from "../pages/Collections/UserCollectionsPage";
import AdminPanel from "../pages/Admin/AdminPanel";
import CollectionItemsPage from "../pages/Items/CollectionItemsPage";

export default function Router() {
	const router = useRoutes([
		{ path: "/", element: <HomePage /> },
		{ path: "/:userName", element: <UserCollectionsPage /> },
		{ path: "/:userName/admin", element: <AdminPanel /> },
		{
			path: "/:userName/:collectionName",
			element: <CollectionItemsPage />,
		},
		{
			path: "/:userName/:collectionName/:itemName",
			element: <CollectionItemsPage />,
		},
	]);
	return router;
}
