import serverUrl from "./serverUrl";
import CollectionsDataIF from "../interfaces/CollectionsDataIF";

export default async function AddNewColl(
    userName: string,
    collection: CollectionsDataIF
) {
    console.log(userName);
    await fetch(`${serverUrl}users/${userName}/newcoll/`, {
        method: "post",
        mode: "cors",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ userName, collection }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
}
