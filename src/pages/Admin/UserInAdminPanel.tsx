import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserDataIF from "../../interfaces/UserDataIF";
import { StoreState } from "../../store/Store";

interface UserInAdminPanelIF {
	user: UserDataIF;
	isCheck: string[];
	handleCheck: React.ChangeEventHandler<HTMLInputElement>;
}

export default function UserInAdminPanel({
	user,
	isCheck,
	handleCheck,
}: UserInAdminPanelIF) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	return (
		<tr>
			<td>
				<Form.Check.Input
					type="checkbox"
					id={user._id}
					checked={isCheck.includes(user._id)}
					onChange={handleCheck}
				/>
			</td>
			<td
				className={
					sessionStorage.getItem("user") === user.userName
						? "fw-bold"
						: ""
				}
			>
				<Link
					to={`/${user.userName}`}
					className="text-decoration-none"
					style={
						theme === "dark"
							? { color: "white" }
							: { color: "black" }
					}
				>
					{user.userName}
				</Link>
			</td>
			<td>{user.isAdmin ? "True" : "False"}</td>
			<td>{user.status}</td>
		</tr>
	);
}
