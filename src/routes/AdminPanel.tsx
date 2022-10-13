import { Button, ButtonGroup, Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { StoreState, useStoreDispatch } from "../store/Store";

import ChangeUsersStatus from "../connectWithServer/ChangeUsersStatus";

import { GetAllDataUsers } from "../store/features/users/UsersSlice";
import UserInAdminPanel from "../components/UserInAdminPanel";

export default function AdminPanel() {
    const users = useSelector((state: StoreState) => state.userReducer.users);
    const dispatch = useStoreDispatch();

    const [checkAll, setCheckAll] = useState<boolean>(false);
    const [isCheck, setIsCheck] = useState<string[]>([]);

    useEffect(() => {
        dispatch(GetAllDataUsers());
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
        <div className="mx-auto w-75">
            <ButtonGroup className="mx-auto mx-3 mt-3">
                <Button
                    variant="light"
                    onClick={async () => ChangeUsersStatus("status", isCheck)}
                >
                    Block / Unblock
                </Button>

                <Button
                    variant="light"
                    onClick={async () => ChangeUsersStatus("isadmin", isCheck)}
                >
                    Change Admin Status
                </Button>
            </ButtonGroup>

            <Table striped bordered responsive="lg">
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
