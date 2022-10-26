import CollectionSchemaIF from "./CollectionSchemaIF";

export default interface UserSchemaIF {
	_id: string;
	userName: string;
	password: string;
	email: string;
	isAdmin: boolean;
	status: string;
	collections: string[];
}
