import ItemsDataIF from "../interfaces/ItemsDataIF";
import serverUrl from "./serverUrl";

export default async function OperationsOnItem(
	userName: string,
	collectionName: string,
	operation: string,
	item: ItemsDataIF,
	index?: number
) {
	await fetch(
		`${serverUrl}users/collections/items/${userName}/${collectionName}/${operation}`,
		{
			method: "post",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ item, index }),
		}
	);
}
