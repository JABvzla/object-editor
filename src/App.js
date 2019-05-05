import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { setIn } from "immutable";
import "./index.css";

/**
 * Main Object Editor Component.
 */
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.addParent = this.addParent.bind(this);
    this.onParentChange = this.onParentChange.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  addParent(e) {
    if (e.key === "Enter") {
      // const obj = Object.assign(this.props.object, this.state.parent);
      this.props.updateObject({ hola: "jose" });
      // this.props.addParent(obj);
    }
  }

  onParentChange(e) {}

  onChangeValue(e, k) {
    this.props.updateObject(
      this.setToValue(this.props.object, e.target.value, k)
    );
  }

  setToValue(obj, value, path) {
    path = path.split(".");

    return setIn(obj, path, value);
  }

  renderObject(object, parent = "") {
    if (!object) return;

    return Object.keys(object).map((parentName, index) => {
      const _parent = parent ? `${parent}.${parentName}` : parentName;

      if (
        object[parentName] !== null &&
        typeof object[parentName] === "object"
      ) {
        return (
          <div key={index} className="parent">
            <label>{parentName}</label>
            {this.renderObject(object[parentName], _parent)}
            <input type="text" />
          </div>
        );
      }
      return (
        <div key={index} className="child">
          {parentName}
          <input
            type="text"
            value={object[parentName]}
            onChange={e => this.onChangeValue(e, _parent)}
          />
        </div>
      );
    });
  }

  render() {
    const { object } = this.props;

    return (
      <div className="App">
        <h1>Object Editor</h1>
        {this.renderObject(object)}
        <input
          type="text"
          onChange={this.onParentChange}
          onKeyDown={this.addParent}
        />
      </div>
    );
  }
}

App.propTypes = {
  object: PropTypes.object.isRequired,
  updateObject: PropTypes.func.isRequired
};

export default App;
