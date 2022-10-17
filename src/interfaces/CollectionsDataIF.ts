import ItemsDataIF from "./ItemsDataIF";

export default interface CollectionsDataIF {
    _id?: string;
    name: string;
    description: string;
    topic: string;
    image: string;
    owner: string;
    items: ItemsDataIF[];
}
