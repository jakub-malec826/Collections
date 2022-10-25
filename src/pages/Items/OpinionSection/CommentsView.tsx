interface CommentsViewIF {
	actualComment: { user: string; comment: string };
	fieldsLength: number;
}

export default function CommentsView({
	actualComment: actualComment,
	fieldsLength,
}: CommentsViewIF) {
	return (
		<>
			<td>{actualComment.user}</td>
			<td colSpan={fieldsLength + 4}>{actualComment.comment}</td>
		</>
	);
}
