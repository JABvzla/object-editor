import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

class ObjectEditor {
  constructor(id, object = {}, config = {}) {
    this.__element = document.getElementById(id);
    this.__cfg = config;

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

  set object(object) {
    this.__obj = object;
    Private.render.bind(this)();
  }

  set mode(mode) {
    if (["FREE", "READ", "UPDATE"].indexOf(mode.toUpperCase()) < 0)
      return console.error(
        "Invalid mode, expected one of ['FREE','READ','UPDATE']"
      );
    this.__cfg.mode = mode.toUpperCase();
    Private.render.bind(this)();
  }

  set config(config) {
    this.__cfg = config;
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
        {...this.__cfg}
      />,
      this.__element
    );
  }
};

export default ObjectEditor;
