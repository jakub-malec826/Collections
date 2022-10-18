import { useState } from "react";
import { Button, Form, Popover } from "react-bootstrap";
import HandleChange from "../../functions/HandleChange";
import { useDispatch } from "react-redux";
import {
	hideFieldsForm,
	setFields,
} from "../../store/features/collectionFields/CollectionFieldsSlice";

export default function CollectionFieldForm() {
	const [state, setState] = useState({
		fieldName: "",
		fieldType: "",
	});

	const dispatch = useDispatch();

	const types = ["text", "number", "textarea", "checkbox", "date"];
	("use strict");
	return (
		<Popover.Body>
			<Form
				className="text-center"
				onSubmit={(e) => {
					e.preventDefault();
					dispatch(setFields(state));
					dispatch(hideFieldsForm());
				}}
			>
				<Form.Control
					type="text"
					name="fieldName"
					placeholder="Field Name"
					required
					value={state.fieldName}
					onChange={(e) => HandleChange(e, setState, state)}
				/>
				<Form.Select
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
				<Button variant="light" type="submit" className="ms-auto m-1">
					Add
				</Button>
			</Form>
		</Popover.Body>
	);
}
