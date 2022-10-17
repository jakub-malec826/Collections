import { useRoutes } from "react-router-dom";
import HomePage from "./HomePage";
import Forms from "../components/Forms/SignForms";
import UserPage from "./UserPage";
import AdminPanel from "./AdminPanel";

export default function Router() {
    const router = useRoutes([
        { path: "/", element: <HomePage /> },
        { path: "/auth/signin", element: <Forms formType="signin" /> },
        { path: "/auth/signup", element: <Forms formType="signup" /> },
        { path: "/:userName", element: <UserPage /> },
        { path: "/:userName/admin", element: <AdminPanel /> },
    ]);
    return router;
}
