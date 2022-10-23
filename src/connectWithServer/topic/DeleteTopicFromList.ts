import serverUrl from "../serverUrl";

export default async function DeleteTopicFromList(topic: string) {
	await fetch(`${serverUrl}topic/delete`, {
		method: "post",
		mode: "cors",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({ topic }),
	});
}
