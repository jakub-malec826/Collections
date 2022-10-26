import CollectionSchemaIF from "../../interfaces/CollectionSchemaIF";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "../../store/Store";
export default function BiggestCollectionsView({
	collectionElement,
}: {
	collectionElement: CollectionSchemaIF;
}) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const nav = useNavigate();
	return (
		<tr
			onClick={() =>
				nav(`/${collectionElement.owner}/${collectionElement.name}`)
			}
			data-color-mode={theme}
		>
			<td>{collectionElement.name}</td>
			<td>{collectionElement.owner}</td>
			<td>
				<MarkdownEditor.Markdown
					source={collectionElement.description}
				/>
			</td>
			<td>{collectionElement.topic}</td>
			<td>
				<img
					src={collectionElement.image.url}
					alt="No image uploaded"
					width={150}
					height={100}
				/>
			</td>
		</tr>
	);
}
