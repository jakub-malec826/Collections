import { useEffect } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../../store/Store";
import { GetAllDataUsers } from "../../../store/features/users/UsersSlice";

import { useTranslation } from "react-i18next";

import { Table } from "react-bootstrap";

import UserInAdminPanel from "./UserInAdminPanel";
import WaitingSpinner from "../../../components/WaitingSpinner";

export default function UserManagement() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const users = useSelector((state: StoreState) => state.UserReducer.users);
	const status = useSelector((state: StoreState) => state.UserReducer.status);

	const dispatch = useStoreDispatch();
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(GetAllDataUsers());
	}, [dispatch]);

	if (status === "loading") return <WaitingSpinner margin="2rem" />;
	else
		return (
			<div className="mx-auto text-center mt-3">
				<Table
					hover
					responsive
					variant={theme}
					className="mx-auto w-auto"
				>
					<thead>
						<tr>
							<th></th>
							<th>{t("user") as string}</th>
							<th>
								{
									t(
										"adminPage.userManagement.isAdmin"
									) as string
								}
							</th>
							<th>
								{t("adminPage.userManagement.status") as string}
							</th>
						</tr>
					</thead>

					<tbody>
						{users.map((u) => (
							<UserInAdminPanel key={users.indexOf(u)} user={u} />
						))}
					</tbody>
				</Table>
			</div>
		);
}
