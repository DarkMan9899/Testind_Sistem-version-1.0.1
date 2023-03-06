import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import {Store} from './Store';
import {BrowserRouter} from "react-router-dom";


let Persist;
ReactDOM.render(
    <React.StrictMode>
        <Provider store={Store}>
            <PersistGate loading={null} persistor={Persist}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);


serviceWorker.unregister();
