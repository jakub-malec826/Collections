import { useSelector } from "react-redux";
import { StoreState } from "../store/Store";

import { useTranslation } from "react-i18next";

import { Button, Modal } from "react-bootstrap";

interface propsIF {
	type: string;
	showModal: boolean;
	handleHide: Function;
}

export default function WarningModal({ type, showModal, handleHide }: propsIF) {
	const theme = useSelector((state: StoreState) => state.ThemeReducer.theme);

	const { t } = useTranslation();

	return (
		<Modal className="mt-5" show={showModal} onHide={() => handleHide()}>
			<Modal.Header
				style={
					theme === "dark"
						? {
								backgroundColor: "rgb(25,29,35)",
								color: "rgb(245,245,245)",
								borderTopLeftRadius: "0.39rem",
								borderTopRightRadius: "0.39rem",
						  }
						: {}
				}
			>
				<Modal.Title>{t("alert.head") as string}</Modal.Title>

				<Button
					size="sm"
					className="d-inline mb-2"
					variant={theme}
					onClick={() => handleHide()}
				>
					ｘ
				</Button>
			</Modal.Header>

			<Modal.Body
				style={
					theme === "dark"
						? {
								backgroundColor: "rgb(25,29,35)",
								color: "rgb(245,245,245)",
								borderBottomLeftRadius: "0.39rem",
								borderBottomRightRadius: "0.39rem",
						  }
						: {}
				}
			>
				<p>{t(`alert.body${type}`) as string}</p>
			</Modal.Body>
		</Modal>
	);
}
