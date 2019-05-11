import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

class ObjectEditor {
  constructor(id, object = {}, _cfg) {
    this.__element = document.getElementById(id);

    if (!this.__element)
      return console.error(`Element id '${id}' was not found`);

    this.__obj = object;
    Private.render.bind(this)();
  }

  get object() {
    return this.__obj;
  }

  get element() {
    return this.__element;
  }

  set object(obj) {
    this.__obj = obj;
    Private.render.bind(this)();
  }
}

const Private = {
  render: function() {
    ReactDOM.render(
      <App
        object={this.__obj}
        onChange={obj => {
          this.object = obj;
        }}
      />,
      this.__element
    );
  }
};

export default ObjectEditor;
