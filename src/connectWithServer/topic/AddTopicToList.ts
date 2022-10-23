import serverUrl from "../serverUrl";

export default async function AddTopicToList(topic: string) {
	await fetch(`${serverUrl}topic/add`, {
		method: "post",
		mode: "cors",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({ topic }),
	});
}
