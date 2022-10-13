import serverUrl from "./serverUrl";

export default async function DeleteColl(
    collectionID: string[],
    userName: string
) {
    await fetch(`${serverUrl}users/${userName}/delcoll`, {
        method: "post",
        mode: "cors",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ collectionID }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
}
