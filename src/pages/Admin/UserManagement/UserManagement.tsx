import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../../store/Store";
import {
	changeAdmin,
	changeStatus,
	GetAllDataUsers,
} from "../../../store/features/users/UsersSlice";

import { Button, ButtonGroup, Container, Form, Spinner, Table } from "react-bootstrap";

import UserInAdminPanel from "./UserInAdminPanel";
import { useTranslation } from "react-i18next";

export default function UserManagement() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const { t } = useTranslation();

	const users = useSelector((state: StoreState) => state.UserReducer.users);

	const status = useSelector((state: StoreState) => state.UserReducer.status);

	const dispatch = useStoreDispatch();

	const [checkAll, setCheckAll] = useState<boolean>(false);
	const [isCheck, setIsCheck] = useState<string[]>([]);

	useEffect(() => {
		dispatch(GetAllDataUsers());
	}, [dispatch]);

	const handleSelectAll = () => {
		setCheckAll(!checkAll);
		setIsCheck(users.map((u) => u._id));
		if (checkAll) setIsCheck([]);
	};

	const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = e.target;
		setIsCheck([...isCheck, id]);
		if (!checked) setIsCheck(isCheck.filter((i) => i !== id));
	};
	if (status === "loading")
		return (
			<Container style={{marginTop: "2rem"}}>
				<Spinner animation="grow" variant="primary" role="status" />
			</Container>
		);
	else
		return (
			<div className="mx-auto text-center">
				<ButtonGroup className="mx-auto mx-3 m-3">
					<Button
						variant={theme}
						onClick={async () => dispatch(changeAdmin(isCheck))}
					>
						{
							t(
								"adminPage.userManagement.changeAdminPrivilege"
							) as string
						}
					</Button>
					<Button
						variant={theme}
						onClick={async () => dispatch(changeStatus(isCheck))}
					>
						{
							t(
								"adminPage.userManagement.changeUserStatus"
							) as string
						}
					</Button>
				</ButtonGroup>

				<Table
					hover
					responsive="sm"
					variant={theme}
					className="mx-auto w-auto"
				>
					<thead>
						<tr>
							<th>
								<Form.Check.Input
									type="checkbox"
									checked={checkAll}
									onChange={handleSelectAll}
								/>
							</th>
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
							<UserInAdminPanel
								key={users.indexOf(u)}
								user={u}
								isCheck={isCheck}
								handleCheck={handleCheck}
							/>
						))}
					</tbody>
				</Table>
			</div>
		);
}
