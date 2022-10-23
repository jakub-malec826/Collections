import { useState } from "react";
import { Button, Form, Popover } from "react-bootstrap";
import HandleChange from "../../functions/HandleChange";
import { useDispatch, useSelector } from "react-redux";
import {
	hideFieldsForm,
	setFields,
} from "../../store/features/collections/collectionFields/CollectionFieldsSlice";
import { StoreState } from "../../store/Store";

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
							backgroundColor: "rgb(21,25,29)",
							color: "rgb(245,245,245)",
					  }
					: {}
			}
		>
			<Form
				className="text-center"
				onSubmit={(e) => {
					e.preventDefault();
					dispatch(setFields(state));
					dispatch(hideFieldsForm());
				}}
			>
				<Form.Control
					className="w-auto mx-auto m-2"
					type="text"
					name="fieldName"
					placeholder="Field Name"
					required
					value={state.fieldName}
					onChange={(e) => HandleChange(e, setState, state)}
				/>
				<Form.Select
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
				<Button variant={theme} type="submit" className="m-1">
					Add
				</Button>
			</Form>
		</Popover.Body>
	);
}
