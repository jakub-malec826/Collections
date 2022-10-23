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
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

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
			style={
				theme === "dark"
					? {
							backgroundColor: "rgb(21,21,21)",
							color: "rgb(240,240,240)",
					  }
					: {}
			}
			show={ItemsForm.formVis}
			onHide={() => dispatch(hideItemsForm())}
		>
			<OffcanvasHeader className="border-bottom border-secondary mb-2">
				<h3 className="d-inline">
					{ItemsForm.forEdit ? "Edit Item" : "Add Item"}
				</h3>
				<Button
					className="d-inline mb-2"
					variant={theme}
					onClick={() => dispatch(hideItemsForm())}
				>
					ｘ
				</Button>
			</OffcanvasHeader>
			<Form onSubmit={handleSubmit} className="text-center">
				<Form.Group className="m-1">
					<Form.Label className="w-auto mx-auto m-2">Name</Form.Label>
					<Form.Control
						className="w-auto mx-auto m-2"
						type="text"
						name="name"
						value={state.name}
						onChange={(e) => HandleChange(e, setState, state)}
					/>
				</Form.Group>
				<Form.Group className="m-1">
					<Form.Label className="w-auto mx-auto m-2">Tags</Form.Label>
					<Form.Control
						className="w-auto mx-auto m-2"
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
									className="mx-auto m-2"
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
								<Form.Label className="w-auto mx-auto m-2 ms-2 d-inline">
									{f.fieldName}
								</Form.Label>
							</div>
						) : f.fieldType !== "textarea" ? (
							<div key={fields.indexOf(f)}>
								<Form.Label className="w-auto mx-auto m-2">
									{f.fieldName}
								</Form.Label>
								<Form.Control
									className="w-auto mx-auto m-2"
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
								<Form.Label className="w-auto mx-auto m-2">
									{f.fieldName}
								</Form.Label>
								<Form.Control
									className="w-auto mx-auto m-2"
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
					variant={theme}
					className="w-auto mx-auto m-2"
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
