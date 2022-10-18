import serverUrl from "./serverUrl";
import UserDataIF from "../interfaces/UserDataIF";

export default async function FindActualUser(
  userName: string
): Promise<UserDataIF> {
  return await fetch(`${serverUrl}users/${userName}`, {
    method: "post",
    mode: "cors",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ userName })
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
