import { useState } from "react";

import { useSelector } from "react-redux";
import { StoreState, useStoreDispatch } from "../store/Store";
import { ValidateFormWithDb } from "../store/features/oneUser/LoginUserSlice";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import {
	Form,
	Button,
	Alert,
	Offcanvas,
	OffcanvasHeader,
	Container,
	Spinner,
} from "react-bootstrap";

import UserSendingDataIF from "../interfaces/UserSendingDataIF";
import HandleChange from "../functions/HandleChange";
import WaitingSpinner from "../components/WaitingSpinner";

interface SignFormPropsIF {
	signFormState: { show: boolean; formType: string };
	setSignFormState: Function;
}

const stateObj: UserSendingDataIF = {
	email: "",
	userName: "",
	password: "",
};

export default function SignForms({
	signFormState,
	setSignFormState,
}: SignFormPropsIF) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);
	const status = useSelector(
		(state: StoreState) => state.LoginUserReducer.status
	);

	const err = useSelector(
		(state: StoreState) => state.LoginUserReducer.errMess
	);

	const [state, setState] = useState<UserSendingDataIF>({ ...stateObj });

	const { t } = useTranslation();
	const dispatch = useStoreDispatch();
	const nav = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			ValidateFormWithDb({
				userData: state,
				formType: signFormState.formType,
				callback: (data: {
					message: string;
					body: UserSendingDataIF | null;
				}) => {
					sessionStorage.setItem("user", data.body?.userName || "");
					nav(`/${data.body?.userName}`, {
						state: { name: data.body?.userName },
					});
					setSignFormState({ ...signFormState, show: false });
					setState({ ...stateObj });
				},
			})
		);
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

			{status === "loading" && <WaitingSpinner margin="0.1rem" />}
		</Offcanvas>
	);
}
