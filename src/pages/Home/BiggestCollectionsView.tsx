import CollectionSchemaIF from "../../interfaces/CollectionSchemaIF";
export default function BiggestCollectionsView({
	collectionElement,
}: {
	collectionElement: CollectionSchemaIF;
}) {
	return (
		<tr>
			<td>{collectionElement.name}</td>
			<td>{collectionElement.owner}</td>
			<td>{collectionElement.description}</td>
			<td>{collectionElement.topic}</td>
			<td>
				<img
					src={collectionElement.image.url}
					alt="No image uploaded"
				/>
			</td>
		</tr>
	);
}
