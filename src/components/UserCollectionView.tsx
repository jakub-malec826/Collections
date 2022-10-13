import CollectionsDataIF from "../interfaces/CollectionsDataIF";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { Form } from "react-bootstrap";

interface UserColViewIF {
    collection: CollectionsDataIF;
    isChecked: string[];
    handleIsEleCheck: React.ChangeEventHandler<HTMLInputElement>;
}

export default function UserCollectionView({
    collection,
    isChecked,
    handleIsEleCheck,
}: UserColViewIF) {
    return (
        <tr>
            <td>
                <Form.Check.Input
                    type="checkbox"
                    id={collection._id}
                    checked={isChecked.includes(collection._id)}
                    onChange={handleIsEleCheck}
                />
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
