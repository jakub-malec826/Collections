import { useSelector } from "react-redux";
import { StoreState } from "../../store/Store";

export default function HomePage() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	return <div>{sessionStorage.getItem("user")}</div>;
}
