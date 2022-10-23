import ItemsDataIF from "./ItemsDataIF";

export default interface CollectionsDataIF {
	_id?: string;
	name: string;
	description: string;
	topic: string;
	image: { url: string; id: string };
	owner: string;
	items: ItemsDataIF[];
	[key: string]: any;
}
