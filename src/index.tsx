import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import NavigationBar from "./app/NavigationBar";
import Router from "./app/Router";

import store from "./store/Store";
import { Provider } from "react-redux";

import "./translations/i18n";
import { Container } from "react-bootstrap";

const rootDiv = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootDiv);

root.render(
	<Provider store={store}>
		<HashRouter basename={"/"}>
			<NavigationBar />
			<Container style={{ marginTop: "13vh" }}>
				<Router />
			</Container>
		</HashRouter>
	</Provider>
);
