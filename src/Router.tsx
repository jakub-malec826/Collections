import { useRoutes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Forms from "./components/Forms/SignForms";
import UserPage from "./pages/UserPage";
import AdminPanel from "./pages/AdminPanel";
import CollectionsPage from "./pages/CollectionsPage";

export default function Router() {
    const router = useRoutes([
        { path: "/", element: <HomePage /> },
        { path: "/:userName", element: <UserPage /> },
        { path: "/:userName/admin", element: <AdminPanel /> },
        { path: "/:userName/:collectionName", element: <CollectionsPage /> },
    ]);
    return router;
}
