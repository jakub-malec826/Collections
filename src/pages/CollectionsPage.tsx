import { Button, OverlayTrigger, Popover, Table, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { StoreState, useStoreDispatch } from "../store/Store";
import {
	showItemsForm,
	emptyItem,
} from "../store/features/Forms/ItemFormSlice";

import TableView from "../components/TableView";
import ItemForm from "../components/Forms/ItemForm";
import CollectionFieldForm from "../components/Forms/CollectionFieldForm";
import { useState, useEffect } from "react";
import ItemsDataIF from "../interfaces/ItemsDataIF";
import {
	deleteFields,
	showFieldsForm,
	startValue,
} from "../store/features/collectionFields/CollectionFieldsSlice";
import {
	getUserOnViewData,
	setCollectionOnView,
} from "../store/features/user/UserOnViewSlice";
import { emptyColl } from "../store/features/Forms/CollectionFormSlice";

export interface ItemStateIF extends ItemsDataIF {
	[key: string]: any;
}

export default function CollectionsPage() {
	const userOnView = useSelector(
		(state: StoreState) => state.UserOnViewReducer.userOnView
	);
	const fields = useSelector(
		(state: StoreState) => state.CollectionFieldsReducer.fields
	);
	const showFields = useSelector(
		(state: StoreState) => state.CollectionFieldsReducer.showForm
	);
	const actualCollection = useSelector(
		(state: StoreState) => state.UserOnViewReducer.collectionOnView
	);

	const { userName } = useParams();

	const dispatch = useDispatch();
	const storeDispatch = useStoreDispatch();

	const { collectionName } = useParams();

	const [state, setState] = useState<ItemStateIF>(emptyItem);

	useEffect(() => {
		dispatch(deleteFields());
		setState(emptyItem);
	}, [collectionName]);

	useEffect(() => {
		dispatch(setCollectionOnView(collectionName));
		storeDispatch(getUserOnViewData(userName ? userName : ""));

		actualCollection &&
			actualCollection.items &&
			actualCollection.items.length !== 0 &&
			actualCollection?.items[
				actualCollection.items.length - 1
			].additionalField?.map((f, i, arr) => {
				arr !== undefined &&
					fields.length !== arr.length &&
					dispatch(startValue(f));
			});
	}, [userOnView.collections, dispatch]);

	return (
		<div className="mx-auto text-center">
			<ItemForm
				state={state}
				setState={setState}
				actualCollection={
					actualCollection ? actualCollection : emptyColl
				}
			/>

			<h4 className="m-3">Collection: {collectionName}</h4>
            <Button
				className="mb-3"
				variant="primary"
				onClick={() => {
					dispatch(showItemsForm([emptyItem, false]));
				}}
			>
				Add new Item
			</Button>

			<Table
				variant="light"
				hover
				responsive="sm"
				className="mx-auto w-auto rounded"
			>
				<thead>
					<tr>
						<th>#</th>
						<th>id</th>
						<th>name</th>
						<th>tags</th>
						{fields !== undefined &&
							fields.map((f) => (
								<th key={fields.indexOf(f)}>{f.fieldName}</th>
							))}
						{actualCollection?.items &&
							actualCollection.items.length === 0 && (
								<th>
									<OverlayTrigger
										trigger="click"
										placement="bottom"
										show={showFields}
										onToggle={() =>
											dispatch(showFieldsForm())
										}
										overlay={
											<Popover>
												<CollectionFieldForm />
											</Popover>
										}
									>
										<Button variant="light">
											Add Field
										</Button>
									</OverlayTrigger>
								</th>
							)}
					</tr>
				</thead>
				<tbody>
					{actualCollection?.items &&
					actualCollection.items.length !== 0 ? (
						actualCollection.items.map((i) => (
							<TableView
								key={i._id}
								itemsToShow={i}
								collectionName={collectionName}
								userOnView={userOnView}
								type="items"
							/>
						))
					) : (
						<tr>
							<td colSpan={fields.length ? fields.length + 5 : 5}>
								No items found 😏
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
}
