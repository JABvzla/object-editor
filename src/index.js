import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

class ObjectEditor {
  constructor(id, _cfg) {
    ReactDOM.render(<App />, document.getElementById(id));
  }
}

if (process.env.NODE_ENV === "development") new ObjectEditor("object-editor");

window.ObjectEditor = ObjectEditor;
