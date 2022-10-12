import serverUrl from "./serverUrl";
import UserDataIF from "../interfaces/UserDataIF";

export default async function FindActualUser(): Promise<UserDataIF> {
    const userName = sessionStorage.getItem("user") || "";

    return await fetch(`${serverUrl}user/one`, {
        method: "post",
        mode: "cors",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ userName }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}
