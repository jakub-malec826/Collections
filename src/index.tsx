import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/Store";

import "bootstrap/dist/css/bootstrap.css";

import NavigationBar from "./components/NavigationBar";
import Router from "./routes/Router";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const baseName = "/";

root.render(
    <React.StrictMode>
        <HashRouter basename={baseName}>
            <Provider store={store}>
                <NavigationBar />
                <Router />
            </Provider>
        </HashRouter>
    </React.StrictMode>
);
