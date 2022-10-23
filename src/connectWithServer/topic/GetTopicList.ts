import serverUrl from "../serverUrl";

export default async function GetTopicList() {
	return await fetch(`${serverUrl}topic/get`)
		.then((res) => res.json())
		.then((data: { _id?: string; topic: string }[]) => {
			return data;
		});
}
