import CollectionsDataIF from "./CollectionsDataIF";

export default interface UserDataIF {
    _id: string;
    userName: string;
    password: string;
    email: string;
    isAdmin: boolean;
    status: string;
    collections: CollectionsDataIF[];
}
