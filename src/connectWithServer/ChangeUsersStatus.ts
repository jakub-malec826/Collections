import serverUrl from "./serverUrl";

export default async function ChangeUsersStatus(
    name: string,
    id: string[],
    callback?: Function,
) {
    await fetch(`${serverUrl}admin/${name}`, {
        method: "post",
        mode: "cors",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(id),
    })
        .then((res) => res.json())
        .then((data) => (callback && callback(data)));
}
