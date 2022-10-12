import { Button, Table } from "react-bootstrap";

import { useSelector, useDispatch, useStore } from "react-redux";
import { StoreState, useStoreDispatch } from "../store/Store";

import CollectionForm from "../components/CollectionForm";
import { showForms } from "../store/features/Forms/FormsVisSlice";
import { useEffect } from "react";
import { getUserData } from "../store/features/user/ActualUserSlice";
import UserCollectionView from "../components/UserCollectionView";

export default function UserPage() {
    const user = useSelector((state: StoreState) => state.oneUserReducer.user);
    const dispatch = useDispatch();
    const storeDispatch = useStoreDispatch();

    useEffect(() => {
        storeDispatch(getUserData());
    }, [user]);

    return (
        <div className="mx-auto w-75 text-center">
            <h4 className="m-3">Hey "{user.userName}"</h4>

            <div className="m-3 text-center">
                <Button variant="success" onClick={() => dispatch(showForms())}>
                    Create new collection
                </Button>
            </div>
            <CollectionForm userName={user.userName} />

            <Table striped responsive="lg" variant="light">
                <thead>
                    <tr>
                        <td colSpan={4} className="text-center">
                            <Button variant="warning" size="sm" className="m-2">
                                Edit
                            </Button>
                            <Button variant="danger" size="sm" className="m-2">
                                Delete
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Topic</td>
                        <td>Image</td>
                    </tr>
                </thead>
                <tbody>
                    {user.collections &&
                        user.collections.map((c) => (
                            <UserCollectionView
                                key={user.collections.indexOf(c)}
                                collections={c}
                            />
                        ))}
                </tbody>
            </Table>
        </div>
    );
}
