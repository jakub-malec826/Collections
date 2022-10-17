import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { StoreState } from "../store/Store";
import { useParams } from "react-router-dom";

export default function CollectionsPage() {
    const userOnView = useSelector(
        (state: StoreState) => state.oneUserReducer.userOnView
    );
    const { collectionName } = useParams();

    return (
        <div className="mx-auto w-75 text-center">
            <h4 className="m-3">Collection: {collectionName}</h4>
            <Button className="mb-3" variant="success">
                Add new Item
            </Button>
            <Table variant="light" striped responsive="lg">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>tags</th>
                        <th>Add field</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </Table>
        </div>
    );
}
