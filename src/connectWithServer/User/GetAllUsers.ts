import UserDataIF from "../../interfaces/UserDataIF";
import serverUrl from "../serverUrl";

export default async function GetAllUsers(): Promise<UserDataIF[]> {
	return await fetch(`${serverUrl}users/allusers`)
		.then((res) => res.json())
		.then((data) => {
			return data;
		});
}
