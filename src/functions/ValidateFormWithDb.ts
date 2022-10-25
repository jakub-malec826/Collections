import serverUrl from "../store/serverUrl";
import HashPassword from "./HashPassword";

interface UserValidationDataIF {
	email: string;
	userName: string;
	password: string;
}

export default async function ValidateFormWithDb(
	userData: UserValidationDataIF,
	formType: string,
	callback?: Function
) {
	userData.password = HashPassword(userData.password);
	await fetch(`${serverUrl}auth/${formType}`, {
		method: "Post",
		mode: "cors",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(userData),
	})
		.then((res) => res.json())
		.then((data) => {
			callback && callback(data);
		});
}
