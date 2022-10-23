import serverUrl from "./serverUrl";
import CollectionsDataIF from "../interfaces/CollectionsDataIF";

export default async function OperationsOnColl(
	userName: string,
	collection: CollectionsDataIF,
	operation: string,
) {
	await fetch(`${serverUrl}users/collections/${userName}/${operation}`, {
		method: "post",
		mode: "cors",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({ collection }),
	});
}
