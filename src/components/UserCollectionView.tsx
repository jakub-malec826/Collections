import CollectionsDataIF from "../interfaces/CollectionsDataIF";
import MarkdownEditor from "@uiw/react-markdown-editor";

interface UserColViewIF {
    collections: CollectionsDataIF;
}

export default function UserCollectionView({ collections }: UserColViewIF) {
    return (
        <tr>
            <td>{collections.name}</td>
            <td data-color-mode="light">
                <MarkdownEditor.Markdown source={collections.description} />
            </td>
            <td>{collections.topic}</td>
            <td>{collections.image}</td>
        </tr>
    );
}
