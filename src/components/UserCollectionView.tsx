import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MarkdownEditor from "@uiw/react-markdown-editor";
import { Button, ButtonGroup } from "react-bootstrap";

import CollectionsDataIF from "../interfaces/CollectionsDataIF";
import UserDataIF from "../interfaces/UserDataIF";
import OperationsOnColl from "../connectWithServer/OperationsOnColl";

import { showForms } from "../store/features/Forms/FormsVisSlice";
import { StoreState } from "../store/Store";

interface UserColViewIF {
    collection: CollectionsDataIF;
    userOnView: UserDataIF;
}

export default function UserCollectionView({
    collection,
    userOnView,
}: UserColViewIF) {
    const actualUser = useSelector(
        (state: StoreState) => state.oneUserReducer.user
    );

    const nav = useNavigate();

    const dispatch = useDispatch();
    return (
        <tr>
            <td>
                <ButtonGroup
                    hidden={
                        userOnView.userName === actualUser.userName
                            ? false
                            : !actualUser.isAdmin
                    }
                >
                    <Button
                        variant="warning"
                        size="sm"
                        onClick={() => {
                            dispatch(showForms([collection, true]));
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={async () =>
                            await OperationsOnColl(
                                userOnView.userName,
                                collection,
                                "delcoll"
                            )
                        }
                    >
                        X
                    </Button>
                </ButtonGroup>
            </td>

            <td onClick={() => nav(`${collection.name}`)}>{collection.name}</td>
            <td data-color-mode="light">
                <MarkdownEditor.Markdown source={collection.description} />
            </td>
            <td>{collection.topic}</td>
            <td>{collection.image}</td>
        </tr>
    );
}
