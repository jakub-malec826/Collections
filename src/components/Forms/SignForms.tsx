import {
	Form,
	Row,
	Button,
	Alert,
	Offcanvas,
	OffcanvasHeader,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ValidateFormWithDb from "../../connectWithServer/ValidateFormWithDb";

import UserDataIF from "../../interfaces/UserDataIF";
import HandleChange from "../../functions/HandleChange";

import { StoreState } from "../../store/Store";
import { hideSignForm } from "../../store/features/Forms/SignFormsSlice";
import { setLoginUser } from "../../store/features/user/LoginUserSlice";

export interface valuesIF {
	email: string;
	userName: string;
	password: string;
}

export default function Forms() {
	const dispatch = useDispatch();
	const SignForms = useSelector(
		(state: StoreState) => state.SignFormsReducer
	);

	const [err, setErr] = useState("");
	const stateObj: valuesIF = {
		email: "",
		userName: "",
		password: "",
	};
	const [state, setState] = useState<valuesIF>({ ...stateObj });
	const nav = useNavigate();

	const SetErrMessCallback = (data: {
		message: string;
		body: UserDataIF | null;
	}) => {
		if (data.message !== "OK") setErr(data.message);
		else {
			setErr("");
			sessionStorage.setItem("user", state.userName);
			nav(`/${state.userName}`, {
				state: { name: sessionStorage.getItem("user") },
			});
			dispatch(setLoginUser(data.body));
			dispatch(hideSignForm());
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await ValidateFormWithDb(state, SignForms.formType, SetErrMessCallback);
		setState({ ...stateObj });
	};

	return (
		<Offcanvas
			show={SignForms.formVis}
			onHide={() => dispatch(hideSignForm())}
			placement="end"
		>
			<OffcanvasHeader closeButton>
				<h4>
					{SignForms.formType === "signin" ? "Sign In" : "Sign Up"}
				</h4>
			</OffcanvasHeader>
			<Form onSubmit={handleSubmit}>
				{err !== "" && (
					<Row className="mx-auto w-25 m-1 text-center">
						<Alert variant="danger">{err}</Alert>
					</Row>
				)}
				{SignForms.formType === "signup" && (
					<Form.Control
						type="email"
						name="email"
						value={state.email}
						placeholder="Email"
						onChange={(e) => HandleChange(e, setState, state)}
						required
					/>
				)}
				<Form.Control
					type="text"
					name="userName"
					value={state.userName}
					placeholder="UserName"
					onChange={(e) => HandleChange(e, setState, state)}
					required
				/>
				<Form.Control
					type="password"
					name="password"
					value={state.password}
					placeholder="Password"
					onChange={(e) => HandleChange(e, setState, state)}
					required
				/>
				<div className="text-center">
					<Button
						type="submit"
						variant="primary"
						className="m-1 d-inline"
					>
						{SignForms.formType === "signin"
							? "Sign In"
							: "Sign up"}
					</Button>
				</div>
			</Form>
		</Offcanvas>
	);
}
