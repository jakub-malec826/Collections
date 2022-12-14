import { useRoutes } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import AdminPanel from "../pages/Admin/AdminPanel";
import UserCollectionsPage from "../pages/Collections/UserCollectionsPage";
import CollectionItemsPage from "../pages/Items/CollectionItemsPage";
import ItemPage from "../pages/Items/ItemPage";

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
			path: "/items/:tagName",
			element: <ItemPage />,
		},
	]);
	return router;
}
