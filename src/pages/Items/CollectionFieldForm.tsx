import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store/Store";
import {
	hideFieldsForm,
	setFields,
} from "../../store/features/collectionFields/CollectionFieldsSlice";

import { useTranslation } from "react-i18next";

import { Button, Form, Popover } from "react-bootstrap";

import HandleChange from "../../functions/HandleChange";

const types = ["text", "number", "textarea", "checkbox", "date"];

export default function CollectionFieldForm() {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const [state, setState] = useState({
		fieldName: "",
		fieldType: "",
	});

	const dispatch = useDispatch();
	const { t } = useTranslation();

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
					placeholder={t("itemPage.fieldName") as string}
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
					{t("add") as string}
				</Button>
			</Form>
		</Popover.Body>
	);
}
