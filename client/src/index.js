import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MessageProvider from "./Context/Messages/MessageProvider";
import AuthProvider from "./Context/Auth/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <MessageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MessageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
