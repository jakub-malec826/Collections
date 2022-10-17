import CollectionsDataIF from "../interfaces/CollectionsDataIF";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import UserDataIF from "../interfaces/UserDataIF";
import OperationsOnColl from "../connectWithServer/OperationsOnColl";
import { useDispatch, useSelector } from "react-redux";
import { showForms } from "../store/features/Forms/FormsVisSlice";
import CollectionForm from "./Forms/CollectionForm";
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
                        Delete
                    </Button>
                </ButtonGroup>
            </td>

            <td>{collection.name}</td>
            <td data-color-mode="light">
                <MarkdownEditor.Markdown source={collection.description} />
            </td>
            <td>{collection.topic}</td>
            <td>{collection.image}</td>
        </tr>
    );
}
