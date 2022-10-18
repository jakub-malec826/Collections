import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Button, Table } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { StoreState, useStoreDispatch } from "../store/Store";

import CollectionForm from "../components/Forms/CollectionForm";
import {
    showCollectionForm,
    emptyColl,
} from "../store/features/Forms/CollectionFormSlice";
import { getUserOnViewData } from "../store/features/user/ActualUserSlice";
import TableView from "../components/TableView";

export default function UserPage() {
    const userOnView = useSelector(
        (state: StoreState) => state.OneUserReducer.userOnView
    );
    const actualUser = useSelector(
        (state: StoreState) => state.OneUserReducer.user
    );
    const dispatch = useDispatch();
    const storeDispatch = useStoreDispatch();
    const { userName } = useParams();

    useEffect(() => {
        storeDispatch(getUserOnViewData(userName ? userName : ""));
    }, [userOnView.userName, userOnView.collections]);

    return (
        <div className="mx-auto text-center">
            <CollectionForm userName={userOnView.userName} />

            <h4 className="m-3">Hey "{userName}"</h4>

            <Button
                className="mb-3"
                hidden={
                    userOnView.userName === actualUser.userName
                        ? false
                        : !actualUser.isAdmin
                }
                variant="success"
                onClick={() => dispatch(showCollectionForm([emptyColl, false]))}
            >
                Create new collection
            </Button>

            <Table
                striped
                responsive="sm"
                variant="light"
                className="mx-auto w-75"
            >
                <thead>
                    <tr>
                        <td></td>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Topic</td>
                        <td>Image</td>
                    </tr>
                </thead>
                <tbody>
                    {userOnView.collections &&
                        userOnView.collections.map((c) => (
                            <TableView
                                key={userOnView.collections.indexOf(c)}
                                collectionToShow={c}
                                userOnView={userOnView}
                                type="collection"
                            />
                        ))}
                </tbody>
            </Table>
        </div>
    );
}
