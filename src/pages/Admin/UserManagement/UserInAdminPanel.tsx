import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../../store/Store";
import {
	DeleteUser,
	SetUserPrivileges,
} from "../../../store/features/users/UsersSlice";
import { SetUserStatus } from "../../../store/features/users/UsersSlice";

import { Link, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";

import UserSchemaIF from "../../../interfaces/UserSchemaIF";

interface UserInAdminPanelIF {
	user: UserSchemaIF;
}

export default function UserInAdminPanel({ user }: UserInAdminPanelIF) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const dispatch = useStoreDispatch();
	const nav = useNavigate();
	const { t } = useTranslation();

	return (
		<tr>
			<td>
				<Button
					onClick={() => {
						if (user.userName === sessionStorage.getItem("user")) {
							sessionStorage.clear();
							nav("/");
						}
						dispatch(DeleteUser(user._id));
					}}
					variant={theme}
					size="sm"
				>
					❌
				</Button>
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

			<td>
				<OverlayTrigger
					placement="bottom"
					overlay={
						<Tooltip>
							{
								t(
									"adminPage.userManagement.changeAdminPrivilege"
								) as string
							}
						</Tooltip>
					}
				>
					<Button
						onClick={() =>
							dispatch(
								SetUserPrivileges({
									user,
									privileges: !user.isAdmin,
								})
							)
						}
						variant={theme}
						size="sm"
					>
						{user.isAdmin ? "✅" : "❌"}
					</Button>
				</OverlayTrigger>
			</td>
			
			<td>
				<OverlayTrigger
					placement="bottom"
					overlay={
						<Tooltip>
							{
								t(
									"adminPage.userManagement.changeUserStatus"
								) as string
							}
						</Tooltip>
					}
				>
					<Button
						onClick={() =>
							dispatch(
								SetUserStatus({
									user,
									status:
										user.status === "active"
											? "blocked"
											: "active",
								})
							)
						}
						variant={theme}
						size="sm"
					>
						{user.status === "active"
							? (t(
									"adminPage.userManagement.statusActive"
							  ) as string)
							: (t(
									"adminPage.userManagement.statusBlocked"
							  ) as string)}
					</Button>
				</OverlayTrigger>
			</td>
		</tr>
	);
}
