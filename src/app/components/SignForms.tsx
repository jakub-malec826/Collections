import { useState } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../../store/Store";
import { setLoginUser } from "../../store/features/oneUser/LoginUserSlice";

import { useNavigate } from "react-router-dom";

import {
	Form,
	Button,
	Alert,
	Offcanvas,
	OffcanvasHeader,
} from "react-bootstrap";

import ValidateFormWithDb from "../../functions/ValidateFormWithDb";

import UserSchemaIF from "../../interfaces/UserSchemaIF";
import HandleChange from "../../functions/HandleChange";

import { useTranslation } from "react-i18next";

export interface valuesIF {
	email: string;
	userName: string;
	password: string;
}
interface SignFormPropsIF {
	signFormState: { show: boolean; formType: string };
	setSignFormState: Function;
}

export default function SignForms({
	signFormState,
	setSignFormState,
}: SignFormPropsIF) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const { t } = useTranslation();

	const dispatch = useStoreDispatch();

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
		body: UserSchemaIF | null;
	}) => {
		console.log(data);
		if (data.message !== "OK") setErr(data.message);
		else {
			setErr("");
			sessionStorage.setItem("user", state.userName);
			nav(`/${state.userName}`, {
				state: { name: sessionStorage.getItem("user") },
			});
			dispatch(setLoginUser(data.body));
			setSignFormState({ ...signFormState, show: false });
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await ValidateFormWithDb(
			state,
			signFormState.formType,
			SetErrMessCallback
		);
		setState({ ...stateObj });
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
			show={signFormState.show}
			onHide={() => setSignFormState({ ...signFormState, show: false })}
			placement="end"
		>
			<OffcanvasHeader className="border-bottom border-secondary m-3">
				<h4 className="d-inline">
					{signFormState.formType === "signin"
						? (t("signIn") as string)
						: (t("signUp") as string)}
				</h4>
				<Button
					size="sm"
					className="d-inline mb-2"
					variant={theme}
					onClick={() =>
						setSignFormState({ ...signFormState, show: false })
					}
				>
					ｘ
				</Button>
			</OffcanvasHeader>
			<Form onSubmit={handleSubmit} className="text-center">
				{err !== "" && (
					<Alert
						className="mx-auto w-50 m-1 text-center"
						variant="danger"
					>
						{t(`signForms.error.${err}`) as string}
					</Alert>
				)}
				{signFormState.formType === "signup" && (
					<Form.Control
						size="sm"
						className="w-auto mx-auto m-2"
						type="email"
						name="email"
						value={state.email}
						placeholder="Email"
						onChange={(e) => HandleChange(e, setState, state)}
						required
					/>
				)}
				<Form.Control
					size="sm"
					className="w-auto mx-auto m-2"
					type="text"
					name="userName"
					value={state.userName}
					placeholder={t("user") as string}
					onChange={(e) => HandleChange(e, setState, state)}
					required
				/>
				<Form.Control
					size="sm"
					className="w-auto mx-auto m-2"
					type="password"
					name="password"
					value={state.password}
					placeholder={t("password") as string}
					onChange={(e) => HandleChange(e, setState, state)}
					required
				/>
				<Button
					size="sm"
					type="submit"
					variant={theme}
					className="m-1 d-inline"
				>
					{signFormState.formType === "signin"
						? (t("signIn") as string)
						: (t("signUp") as string)}
				</Button>
			</Form>
		</Offcanvas>
	);
}
