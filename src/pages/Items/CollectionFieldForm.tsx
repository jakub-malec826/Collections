import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store/Store";
import {
	hideFieldsForm,
	setFields,
} from "../../store/features/collectionFields/CollectionFieldsSlice";

import { Button, Form, Popover, Container } from "react-bootstrap";

import HandleChange from "../../functions/HandleChange";

export default function CollectionFieldForm() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const [state, setState] = useState({
		fieldName: "",
		fieldType: "",
	});

	const dispatch = useDispatch();

	const types = ["text", "number", "textarea", "checkbox", "date"];
	("use strict");
	return (
		<Popover.Body
			style={
				theme === "dark"
					? {
							backgroundColor: "rgb(25,29,35)",
							color: "rgb(245,245,245)",
							borderRadius: "0.39rem",
					  }
					: {}
			}
		>
			<h4 className="mb-3">Add field</h4>
			<Form
				className="text-center"
				onSubmit={(e) => {
					e.preventDefault();
					dispatch(setFields(state));
					dispatch(hideFieldsForm());
				}}
			>
				<Form.Control
					size="sm"
					className="w-auto mx-auto m-2"
					type="text"
					name="fieldName"
					placeholder="Field Name"
					style={{ textTransform: "lowercase" }}
					required
					value={state.fieldName}
					onChange={(e) => HandleChange(e, setState, state)}
				/>
				<Form.Select
					size="sm"
					className="w-auto mx-auto m-2"
					value={state.fieldType}
					name="fieldType"
					required
					onChange={(e) => HandleChange(e, setState, state)}
				>
					{types.map((item) => (
						<option key={types.indexOf(item)} value={item}>
							{item}
						</option>
					))}
				</Form.Select>
				<Button size="sm" variant={theme} type="submit" className="m-1">
					Add
				</Button>
			</Form>
		</Popover.Body>
	);
}
