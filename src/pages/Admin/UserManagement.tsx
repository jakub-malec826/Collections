import { Button, ButtonGroup, Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { StoreState, useStoreDispatch } from "../../store/Store";

import ChangeUsersStatus from "../../connectWithServer/User/ChangeUsersStatus";

import { GetAllDataUsers } from "../../store/features/users/UsersSlice";
import UserInAdminPanel from "./UserInAdminPanel";

export default function UserManagement() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const users = useSelector((state: StoreState) => state.UserReducer.users);

	const storeDispatch = useStoreDispatch();

	const [checkAll, setCheckAll] = useState<boolean>(false);
	const [isCheck, setIsCheck] = useState<string[]>([]);

	useEffect(() => {
		storeDispatch(GetAllDataUsers());
	}, [users]);

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

	return (
		<div className="mx-auto text-center">
			<ButtonGroup className="mx-auto mx-3 m-3">
				<Button
					variant={theme}
					onClick={async () => ChangeUsersStatus("isadmin", isCheck)}
				>
					Change Admin Status
				</Button>
				<Button
					variant={theme}
					onClick={async () => ChangeUsersStatus("status", isCheck)}
				>
					Block / Unblock
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
						<th>User Name</th>
						<th>Is Admin</th>
						<th>Status</th>
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
