import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import GlobalContextProvider from "./contexts/global-context.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalContextProvider>
        <>
          <App />
          <ToastContainer />
        </>
      </GlobalContextProvider>
    </Provider>
  </React.StrictMode>
);
