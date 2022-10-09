import { Button, ButtonGroup, Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { UsersState } from "../store/Store";

import GetAllUsers from "../connectWithServer/GetAllUsers";
import { getUsers } from "../store/features/users/UsersSlice";
import ChangeUsersStatus from "../connectWithServer/ChangeUsersStatus";

export default function AdminPanel() {
    const users = useSelector((state: UsersState) => state.userReducer.users);
    const dispatch = useDispatch();

    const [checkAll, setCheckAll] = useState<boolean>(false);
    const [isCheck, setIsCheck] = useState<string[]>(users.map((u) => u._id));

    useEffect(() => {
        const getData = async () => {
            users.length === 0 && dispatch(getUsers(await GetAllUsers()));
        };
        getData();
    }, [users]);

    const handleSelectAll = () => {
        setCheckAll(!checkAll);
        setIsCheck(users.map((u) => u._id));
        if (checkAll) setIsCheck([]);
    };

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isCheck.length === users.length - 1) setCheckAll(true);
        else setCheckAll(false);
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) setIsCheck(isCheck.filter((i) => i !== id));
    };

    return (
        <div className="mx-auto w-75">
            <ButtonGroup className="mx-auto mx-3 mt-3">
                <Button
                    variant="light"
                    onClick={async () => ChangeUsersStatus("block", isCheck)}
                >
                    Block
                </Button>
                <Button
                    variant="light"
                    onClick={async () => ChangeUsersStatus("unblock", isCheck)}
                >
                    Unlock
                </Button>
                <Button
                    variant="light"
                    onClick={async () => ChangeUsersStatus("isadmin", isCheck)}
                >
                    Change Admin Status
                </Button>
            </ButtonGroup>

            <Table striped bordered responsive="sm">
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
                        <tr key={users.indexOf(u)}>
                            <td>
                                <Form.Check.Input
                                    type="checkbox"
                                    id={u._id}
                                    checked={isCheck.includes(u._id)}
                                    onChange={handleCheck}
                                />
                            </td>
                            <td
                                className={
                                    sessionStorage.getItem("user") ===
                                    u.userName
                                        ? "fw-bold"
                                        : ""
                                }
                            >
                                {u.userName}
                            </td>
                            <td>{u.isAdmin ? "True" : "False"}</td>
                            <td>{u.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
