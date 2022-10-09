import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import NavigationBar from "./components/NavigationBar";
import Router from "./routes/Router";

import store from "./store/Store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const baseName = "/";

root.render(
    <Provider store={store}>
        <HashRouter basename={baseName}>
            <NavigationBar />
            <Router />
        </HashRouter>
    </Provider>
);
