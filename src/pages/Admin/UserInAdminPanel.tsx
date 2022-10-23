import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserDataIF from "../../interfaces/UserDataIF";

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
					style={{ color: "black" }}
				>
					{user.userName}
				</Link>
			</td>
			<td>{user.isAdmin ? "True" : "False"}</td>
			<td>{user.status}</td>
		</tr>
	);
}
