import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";
import {
	deleteFields,
	setFields,
	showFieldsForm,
} from "../../store/features/collectionFields/CollectionFieldsSlice";

import { useParams, useNavigate } from "react-router-dom";

import {
	Button,
	OverlayTrigger,
	Popover,
	Table,
	Container,
	Form,
	Spinner,
} from "react-bootstrap";

import ItemForm from "./ItemForm";
import LikesAdnCollectionFieldForm from "./CollectionFieldForm";

import ItemSchemaIF from "../../interfaces/ItemSchemaIF";
import ItemsTableView from "./ItemsTableView";
import { useTranslation } from "react-i18next";
import ExportToCsv from "../../functions/ExportToCsv";
import { emptyItem, deleteItems } from "../../store/features/items/ItemsSlice";
import { GetItemsFromDb } from "../../store/features/items/ItemsThunk";

export interface ItemStateIF extends ItemSchemaIF {
	[key: string]: any;
}

export default function CollectionItemsPage() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const { t } = useTranslation();

	const fields = useSelector(
		(state: StoreState) => state.CollectionFieldsReducer.fields
	);
	const showFields = useSelector(
		(state: StoreState) => state.CollectionFieldsReducer.showForm
	);

	const items = useSelector(
		(state: StoreState) => state.ItemsReducer.collectionItems
	);

	const status = useSelector(
		(state: StoreState) => state.ItemsReducer.status
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

	const [filterText, setFilterText] = useState("");
	const [sortMethod, setSortMethod] = useState("name");

	const sortedItems = [...items].sort((a, b) => {
		if (sortMethod !== "tag")
			return a[sortMethod.toLowerCase()] < b[sortMethod.toLowerCase()]
				? -1
				: 1;
		else return a.tag[0].toLowerCase() < b.tag[0].toLowerCase() ? -1 : 1;
	});

	const dispatch = useStoreDispatch();

	useEffect(() => {
		dispatch(
			GetItemsFromDb({
				collectionName: collectionName || "",
				filterText,
			})
		);
		return () => {
			dispatch(deleteFields());
			dispatch(deleteItems());
		};
	}, [dispatch, collectionName, filterText]);

	useEffect(() => {
		items &&
			items.length !== 0 &&
			items[0]?.additionalField?.map((f, i, arr) => {
				fields.length !== arr.length && dispatch(setFields(f));
			});
	}, [dispatch, items]);

	if (status === "loading")
		return (
			<Container className="text-center" style={{ marginTop: "50vh" }}>
				<Spinner animation="grow" variant="primary" role="status" />
			</Container>
		);
	else
		return (
			<div className="mx-auto text-center">
				<ItemForm
					owner={collectionName || ""}
					itemFormState={itemFormState}
					setItemFormState={setItemFormState}
				/>

				<h4 className="m-3">
					{t("collection") as string}: {collectionName}
				</h4>
				<Container className="mb-3">
					<Button
						size="sm"
						className="mx-1 d-inline w-auto"
						variant="primary"
						onClick={() => {
							setItemFormState({
								show: true,
								forEdit: false,
								item: emptyItem,
							});
						}}
					>
						{t("itemPage.addNew") as string}
					</Button>
					<Form.Control
						size="sm"
						className="w-auto d-inline"
						type="text"
						placeholder={t("filter") as string}
						name="filteringItems"
						value={filterText}
						onChange={(e) => setFilterText(e.target.value)}
					/>
					<Button
						size="sm"
						variant={theme}
						onClick={async () =>
							ExportToCsv(collectionName || "", items)
						}
					>
						Export to csv
					</Button>
				</Container>

				<Table
					size="sm"
					variant={theme}
					hover
					className="mx-auto w-auto rounded"
					style={{ minWidth: "320px", tableLayout: "fixed" }}
				>
					<thead>
						<tr>
							<th>
								<Form.Select
									size="sm"
									className="w-auto"
									value={sortMethod}
									onChange={(e) =>
										setSortMethod(e.target.value)
									}
								>
									<option value="id">Id</option>
									<option value="name">
										{t("name") as string}
									</option>
									<option value="tag">
										{t("itemPage.tags") as string}
									</option>
									{fields.map((cf) => {
										if (cf.fieldType !== "checkbox")
											return (
												<option
													value={cf.fieldName}
													key={fields.indexOf(cf)}
												>
													{cf.fieldName}
												</option>
											);
									})}
								</Form.Select>
							</th>
							<th>Id</th>
							<th> {t("name") as string}</th>
							<th> {t("itemPage.tags") as string}</th>
							{fields !== undefined &&
								fields.map((f) => (
									<th key={fields.indexOf(f)}>
										{f.fieldName}
									</th>
								))}
							{items.length === 0 && (
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
												<LikesAdnCollectionFieldForm />
											</Popover>
										}
									>
										<Button size="sm" variant={theme}>
											<strong>
												{
													t(
														"itemPage.addField"
													) as string
												}
											</strong>
										</Button>
									</OverlayTrigger>
								</th>
							)}
						</tr>
					</thead>
					<tbody>
						{sortedItems.length !== 0 ? (
							sortedItems.map((i) => (
								<ItemsTableView
									hideComments={true}
									key={sortedItems.indexOf(i)}
									itemElement={i}
									setItemFormState={setItemFormState}
								/>
							))
						) : (
							<tr>
								<td
									colSpan={
										fields.length ? fields.length + 5 : 5
									}
								>
									{t("itemPage.noItems") as string}
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</div>
		);
}
