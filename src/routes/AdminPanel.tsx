import { Form, Table } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { UsersState } from "../store/Store";

import GetAllUsers from "../connectWithServer/GetAllUsers";
import { getUsers } from "../store/features/users/UsersSlice";

export default function AdminPanel() {
    const users = useSelector((state: UsersState) => state.userReducer.users);
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            users.length === 0 && dispatch(getUsers(await GetAllUsers()));
        };
        getData();
    }, []);

    return (
        <div className="mx-auto w-75">
            <Table striped bordered responsive="sm" className="m-3">
                <thead>
                    <tr>
                        <th>
                            <Form.Check.Input type="checkbox" />
                        </th>
                        <th>User Name</th>
                        <th>Admin?</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={users.indexOf(u)}>
                            <td>
                                <Form.Check.Input type="checkbox" />
                            </td>
                            <td>{u.userName}</td>
                            <td>{u.isAdmin? "True": "False"}</td>
                            <td>{u.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
