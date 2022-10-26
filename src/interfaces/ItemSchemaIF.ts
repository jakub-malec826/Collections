export default interface ItemSchemaIF {
	_id?: string;
	name: string;
	tag: string[];
	comments: { user: string; comment: string }[];
	likes: string[];
	date: string;
	owner: string;
	author: string;
	additionalField: { fieldName: string; fieldType: string }[];
	[key: string]: any;
}
