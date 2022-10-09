import { useLocation, useNavigate } from "react-router-dom";
export default function UserPage() {
    const nav = useNavigate();
    const loc = useLocation();
    return (
        <div>
            <p>Hey {loc.state.name}</p>
            
        </div>
    );
}
