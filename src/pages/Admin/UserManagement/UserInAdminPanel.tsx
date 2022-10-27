import { useEffect } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../../store/Store";
import { SetDataUsers } from "../../../store/features/users/UsersSlice";

import { Form } from "react-bootstrap";

import { Link } from "react-router-dom";

import UserSchemaIF from "../../../interfaces/UserSchemaIF";
import { useTranslation } from "react-i18next";

interface UserInAdminPanelIF {
	user: UserSchemaIF;
	isCheck: string[];
	handleCheck: React.ChangeEventHandler<HTMLInputElement>;
}

export default function UserInAdminPanel({
	user,
	isCheck,
	handleCheck,
}: UserInAdminPanelIF) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const { t } = useTranslation();

	const dispatch = useStoreDispatch();

	useEffect(() => {
		dispatch(SetDataUsers(user));
	}, [dispatch, user]);

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
			<td>{user.isAdmin ? "✅" : "❌"}</td>
			<td>
				{user.status === "active"
					? (t("adminPage.userManagement.statusActive") as string)
					: (t("adminPage.userManagement.statusBlocked") as string)}
			</td>
		</tr>
	);
}
