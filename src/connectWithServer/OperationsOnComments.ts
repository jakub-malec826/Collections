import serverUrl from "./serverUrl";

export default async function OperationsOnComments(
	owner: string,
	collectionName: string,
	operation: string,
	loginUser?: string,
	itemIndex?: number,
	comment?: { user: string; comment: string }
) {
	await fetch(
		`${serverUrl}users/collections/items/${owner}/${collectionName}/${operation}`,
		{
			method: "post",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ itemIndex, loginUser, comment }),
		}
	);
}
