import { Button, Form, Offcanvas, OffcanvasHeader } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { StoreState } from "../../store/Store";
import {
	hideItemsForm,
	emptyItem,
} from "../../store/features/forms/ItemFormSlice";
import HandleChange from "../../functions/HandleChange";
import { ItemStateIF } from "../../pages/Collections/CollectionsPage";
import React from "react";
import { useParams } from "react-router-dom";
import { deleteFields } from "../../store/features/collections/collectionFields/CollectionFieldsSlice";
import { useEffect } from "react";
import OperationsOnItem from "../../connectWithServer/OperationsOnItem";
import CollectionsDataIF from "../../interfaces/CollectionsDataIF";

interface propsIF {
	state: ItemStateIF;
	setState: Function;
	actualCollection: CollectionsDataIF;
}

export default function ItemForm({
	state,
	setState,
	actualCollection,
}: propsIF) {
	const ItemsForm = useSelector((state: StoreState) => state.ItemFormReducer);

	const { collectionName, userName } = useParams();

	const dispatch = useDispatch();
	const fields = useSelector(
		(state: StoreState) => state.CollectionFieldsReducer.fields
	);

	useEffect(() => {
		const tempItems: any = {};
		fields.map(
			(f) =>
				(tempItems[f.fieldName.toLowerCase()] =
					f.fieldType !== "checkbox" ? "" : false)
		);
		ItemsForm.forEdit
			? setState({ ...state, ...ItemsForm.items })
			: setState({ ...emptyItem, ...tempItems });
	}, [ItemsForm]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		ItemsForm.forEdit
			? await OperationsOnItem(
					userName ? userName : "",
					collectionName ? collectionName : "",
					"edititem",
					state,
					actualCollection.items.findIndex((s) => s._id === state._id)
			  )
			: await OperationsOnItem(
					userName ? userName : "",
					collectionName ? collectionName : "",
					"additem",
					state
			  );
		setState({
			name: "",
			tag: [],
		});
		dispatch(deleteFields());
		dispatch(hideItemsForm());
	};

	return (
		<Offcanvas
			show={ItemsForm.formVis}
			onHide={() => dispatch(hideItemsForm())}
		>
			<OffcanvasHeader closeButton>
				{ItemsForm.forEdit ? "Edit Item" : "Add Item"}
			</OffcanvasHeader>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="m-1">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						name="name"
						value={state.name}
						onChange={(e) => HandleChange(e, setState, state)}
					/>
				</Form.Group>
				<Form.Group className="m-1">
					<Form.Label>Tags</Form.Label>
					<Form.Control
						type="text"
						name="tag"
						placeholder="tag1,tag2,..."
						value={state.tag}
						onChange={(e) =>
							setState({
								...state,
								tag: [...e.target.value.split(",")],
							})
						}
					/>
				</Form.Group>
				<Form.Group className="m-1">
					{fields.map((f) =>
						f.fieldType === "checkbox" ? (
							<div key={fields.indexOf(f)}>
								<Form.Check.Input
									className="ms-1"
									type="checkbox"
									name={f.fieldName.toLowerCase()}
									checked={state[f.fieldName.toLowerCase()]}
									onChange={() =>
										setState({
											...state,
											[f.fieldName.toLowerCase()]:
												!state[
													f.fieldName.toLowerCase()
												],
										})
									}
								/>
								<Form.Label className="ms-2">
									{f.fieldName}
								</Form.Label>
							</div>
						) : f.fieldType !== "textarea" ? (
							<div key={fields.indexOf(f)}>
								<Form.Label>{f.fieldName}</Form.Label>
								<Form.Control
									type={f.fieldType}
									name={f.fieldName.toLowerCase()}
									value={state[f.fieldName.toLowerCase()]}
									onChange={(e) =>
										HandleChange(e, setState, state)
									}
								/>
							</div>
						) : (
							<div key={fields.indexOf(f)}>
								<Form.Label>{f.fieldName}</Form.Label>
								<Form.Control
									as={f.fieldType}
									name={f.fieldName.toLowerCase()}
									value={state[f.fieldName.toLowerCase()]}
									onChange={(e) =>
										HandleChange(e, setState, state)
									}
								/>
							</div>
						)
					)}
				</Form.Group>

				<Button
					variant="light"
					type="submit"
					onClick={() =>
						setState({ ...state, additionalField: fields })
					}
				>
					Send
				</Button>
			</Form>
		</Offcanvas>
	);
}
