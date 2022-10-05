import serverUrl from "./serverUrl";
import HashPassword from "../components/HashPassword";

interface UserDataIF {
    email: string;
    userName: string;
    password: string;
}

export default async function ValidateFormWithDb(
    userData: UserDataIF,
    formType: string,
    callback?: Function
) {
    userData.password = HashPassword(userData.password);
    await fetch(`${serverUrl}${formType}`, {
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
