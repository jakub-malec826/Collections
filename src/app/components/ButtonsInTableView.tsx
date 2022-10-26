import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";
import {
	DeleteCollectionFromDb,
	DeleteItemFromCollection,
} from "../../store/features/collections/CollectionsSlice";

import { useParams } from "react-router-dom";

import { Button, ButtonGroup } from "react-bootstrap";
import CollectionSchemaIF from "../../interfaces/CollectionSchemaIF";
import ItemSchemaIF from "../../interfaces/ItemSchemaIF";
import { DeleteItemFromDb } from "../../store/features/items/ItemsSlice";

interface propsIF {
	tableType: string;
	setFormState: Function;
	collectionElement?: CollectionSchemaIF;
	itemElement?: ItemSchemaIF;
	callback?: Function;
}

export default function ButtonsInTableView({
	tableType,
	setFormState,
	collectionElement,
	itemElement,
	callback,
}: propsIF) {
	const actualUser = useSelector(
		(state: StoreState) => state.LoginUserReducer.loginUser
	);

	const dispatch = useStoreDispatch();

	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const { userName } = useParams();

	const hidden =
		userName === actualUser.userName ? false : !actualUser.isAdmin;

	return (
		<td>
			<ButtonGroup>
				<Button
					size="sm"
					hidden={hidden}
					className="m-0"
					variant={theme}
					onClick={() => {
						tableType === "collection" &&
							setFormState({
								show: true,
								forEdit: true,
								collection: collectionElement,
							});
						tableType === "item" &&
							setFormState({
								show: true,
								forEdit: true,
								item: itemElement,
							});
						callback && callback(false);
					}}
				>
					✍🏼
				</Button>
				<Button
					size="sm"
					hidden={hidden}
					className="m-0"
					variant={theme}
					onClick={async () => {
						tableType === "collection" &&
							collectionElement &&
							dispatch(
								DeleteCollectionFromDb(
									collectionElement._id
										? collectionElement._id
										: ""
								)
							);
						tableType === "item" &&
							itemElement &&
							dispatch(
								DeleteItemFromDb(
									itemElement._id ? itemElement._id : ""
								)
							);
						itemElement &&
							dispatch(
								DeleteItemFromCollection({
									collectionId: itemElement?.owner
										? itemElement.owner
										: "",
									itemId: itemElement?._id
										? itemElement._id
										: "",
								})
							);

						callback && callback(false);
					}}
				>
					❌
				</Button>
			</ButtonGroup>
		</td>
	);
}
