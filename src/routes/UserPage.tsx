import { Button, Form, Table } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { StoreState, useStoreDispatch } from "../store/Store";

import CollectionForm from "../components/CollectionForm";
import { showForms } from "../store/features/offcanvas/FormsVisSlice";
import { useEffect, useState } from "react";
import { getUserOnViewData } from "../store/features/user/ActualUserSlice";
import UserCollectionView from "../components/UserCollectionView";
import { useParams } from "react-router-dom";
import DeleteColl from "../connectWithServer/DeleteColl";

export default function UserPage() {
    const userOnView = useSelector(
        (state: StoreState) => state.oneUserReducer.userOnView
    );
    const actualUser = useSelector(
        (state: StoreState) => state.oneUserReducer.user
    );
    const dispatch = useDispatch();
    const storeDispatch = useStoreDispatch();
    const { userName } = useParams();

    useEffect(() => {
        storeDispatch(getUserOnViewData(userName ? userName : ""));
    }, [userOnView]);

    const [checkAll, setCheckAll] = useState<boolean>(false);
    const [isEleCheck, setIsEleCheck] = useState<string[]>([]);

    const handleSelectAll = () => {
        setCheckAll(!checkAll);
        setIsEleCheck(userOnView.collections.map((c) => c._id));
        if (checkAll) setIsEleCheck([]);
    };

    const handleIsEleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        setIsEleCheck([...isEleCheck, id]);
        if (!checked) setIsEleCheck(isEleCheck.filter((i) => i !== id));
    };

    return (
        <div className="mx-auto w-75 text-center">
            <h4 className="m-3">Hey "{userName}"</h4>

            <div className="m-3 text-center">
                <Button
                    hidden={
                        userOnView.userName === actualUser.userName
                            ? false
                            : !actualUser.isAdmin
                    }
                    variant="success"
                    onClick={() => dispatch(showForms())}
                >
                    Create new collection
                </Button>
            </div>
            <CollectionForm userName={userOnView.userName} />

            <Table striped responsive="lg" variant="light">
                <thead>
                    <tr>
                        <td
                            colSpan={5}
                            className="text-center"
                            hidden={
                                actualUser.userName === userOnView.userName
                                    ? false
                                    : !actualUser.isAdmin
                            }
                        >
                            <Button variant="warning" size="sm" className="m-2">
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                className="m-2"
                                onClick={() =>
                                    DeleteColl(isEleCheck, userOnView.userName)
                                }
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Check.Input
                                type="checkbox"
                                checked={checkAll}
                                onChange={handleSelectAll}
                            />
                        </td>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Topic</td>
                        <td>Image</td>
                    </tr>
                </thead>
                <tbody>
                    {userOnView.collections &&
                        userOnView.collections.map((c) => (
                            <UserCollectionView
                                key={userOnView.collections.indexOf(c)}
                                collection={c}
                                isChecked={isEleCheck}
                                handleIsEleCheck={handleIsEleCheck}
                            />
                        ))}
                </tbody>
            </Table>
        </div>
    );
}
