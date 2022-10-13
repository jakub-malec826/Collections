export default interface ItemsDataIF {
    _id: string;
    id: number;
    name: string;
    tag: string[];
    comments: [
        {
            user: string;
            comment: string;
        }
    ];
    likes: number;
}
