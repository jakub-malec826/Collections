import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import NavigationBar from "./components/NavigationBar";
import Router from "./Router";

import store from "./store/Store";
import { Provider } from "react-redux";

const rootDiv = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootDiv);

root.render(
	<Provider store={store}>
		<HashRouter basename={"/"}>
			<NavigationBar />
			<div>
				<Router />
			</div>
		</HashRouter>
	</Provider>
);
