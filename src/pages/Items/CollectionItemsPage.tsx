import { useState, useEffect, useCallback } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";
import {
	deleteFields,
	setFields,
	showFieldsForm,
} from "../../store/features/collectionFields/CollectionFieldsSlice";

import { useParams } from "react-router-dom";

import { Button, OverlayTrigger, Popover, Table } from "react-bootstrap";

import ItemForm from "./ItemForm";
import LikesAdnCollectionFieldForm from "./CollectionFieldForm";

import ItemSchemaIF from "../../interfaces/ItemDataIF";
import {
	deleteItems,
	emptyItem,
	GetItemsFromDb,
} from "../../store/features/items/ItemsSlice";
import ItemsTableView from "./ItemsTableView";

export interface ItemStateIF extends ItemSchemaIF {
	[key: string]: any;
}

export default function CollectionItemsPage() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const fields = useSelector(
		(state: StoreState) => state.CollectionFieldsReducer.fields
	);
	const showFields = useSelector(
		(state: StoreState) => state.CollectionFieldsReducer.showForm
	);

	const items = useSelector(
		(state: StoreState) => state.ItemsReducer.collectionItems
	);

	const [itemFormState, setItemFormState] = useState<{
		show: boolean;
		forEdit: boolean;
		item: ItemSchemaIF;
	}>({
		show: false,
		forEdit: false,
		item: emptyItem,
	});

	const { collectionName } = useParams();

	const dispatch = useStoreDispatch();

	const callback = useCallback(() => {
		dispatch(deleteFields());
		dispatch(deleteItems());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetItemsFromDb(collectionName ? collectionName : ""));
		return callback();
	}, [dispatch, callback]);

	useEffect(() => {
		items &&
			items.length !== 0 &&
			items[0]?.additionalField?.map((f, i, arr) => {
				fields.length !== arr.length && dispatch(setFields(f));
			});
	}, [dispatch, items]);

	return (
		<div className="mx-auto text-center">
			<ItemForm
				owner={collectionName ? collectionName : ""}
				itemFormState={itemFormState}
				setItemFormState={setItemFormState}
			/>

			<h4 className="m-3">Collection: {collectionName}</h4>
			<Button
				className="mb-3"
				variant="primary"
				onClick={() => {
					setItemFormState({
						show: true,
						forEdit: false,
						item: emptyItem,
					});
				}}
			>
				Add new Item
			</Button>

			<Table
				variant={theme}
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
						{items.length === 0 && (
							<th>
								<OverlayTrigger
									trigger="click"
									placement="bottom"
									show={showFields}
									onToggle={() => dispatch(showFieldsForm())}
									overlay={
										<Popover>
											<Popover.Header
												style={
													theme === "dark"
														? {
																backgroundColor:
																	"rgb(32,35,38)",
																color: "rgb(240,240,240)",
														  }
														: {}
												}
											>
												Add Field
											</Popover.Header>
											<LikesAdnCollectionFieldForm />
										</Popover>
									}
								>
									<Button variant={theme}>Add Field</Button>
								</OverlayTrigger>
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{items.length !== 0 ? (
						items.map((i) => (
							<ItemsTableView
								key={items.indexOf(i)}
								itemElement={i}
								setItemFormState={setItemFormState}
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
