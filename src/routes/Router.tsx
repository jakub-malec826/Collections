import { useRoutes } from "react-router-dom";
import HomePage from "./HomePage";
import Forms from "./Forms";

export default function Router() {
    const router = useRoutes([
        { path: "/", element: <HomePage /> },
        { path: "/signin", element: <Forms formType="signin" /> },
        { path: "/signup", element: <Forms formType="signup" /> },
    ]);
    return router;
}
