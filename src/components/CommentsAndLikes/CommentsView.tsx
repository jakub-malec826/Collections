import ItemsDataIF from "../../interfaces/ItemsDataIF";

interface CommentsViewIF {
	actualItem: { user: string; comment: string };
	fieldsLength: number;
	showComments: boolean;
}

export default function CommentsView({
	actualItem,
	fieldsLength,
	showComments,
}: CommentsViewIF) {
	return (
		<>
			<tr hidden={showComments}>
				<td>{actualItem.user}</td>
				<td colSpan={fieldsLength + 4}>{actualItem.comment}</td>
			</tr>
		</>
	);
}
