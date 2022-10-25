import ItemSchemaIF from "../../interfaces/ItemDataIF";
import { useNavigate } from "react-router-dom";
interface propsIF {
	itemElement: ItemSchemaIF;
}

export default function LastItemsView({ itemElement }: propsIF) {
	const nav = useNavigate();
	return (
		<tr
			onClick={() =>
				nav(
					`${itemElement.author}/${itemElement.owner}/${itemElement.name}`
				)
			}
		>
			<td>{itemElement.name}</td>
			<td>{itemElement.owner}</td>
			<td>{itemElement.author}</td>
		</tr>
	);
}
