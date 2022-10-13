import serverUrl from "./serverUrl";
import UserDataIF from "../interfaces/UserDataIF";
import { useParams } from "react-router-dom";

export default async function FindActualUser(userName: string): Promise<UserDataIF> {

    return await fetch(
        `${serverUrl}users/${userName}/one`,
        {
            method: "post",
            mode: "cors",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ userName }),
        }
    )
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}
