import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { getIn, setIn, removeIn } from "immutable";
import "./index.css";

/**
 * Main Object Editor Component.
 */
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.addParent = this.addParent.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  addParent(e, path) {
    if (e.key === "Enter" && e.target.value) {
      const newPath = path ? `${path}.${e.target.value}` : e.target.value;

      this.onChangeValue(e, newPath, true);
      e.target.value = "";
    }
  }

  onChangeValue(e, path, isKey = false) {
    this.props.onChange(
      this.setToValue(this.props.object, e.target.value, path, isKey)
    );
  }

  onRemoveValue(path) {
    this.props.onChange(this.removeValue(this.props.object, path));
  }

  /**
   * Add or Update value to an object.
   *
   * @param  {Object} obj - Object to be updated.
   * @param  {string} value - Value to be added.
   * @param  {string} path - Path to update, separated with dot.
   * @param  {boolean} isKey - If true is a key else value. Default is false.
   *
   * @returns {Object} Return a new object updated.
   */
  setToValue(obj, value, path, isKey) {
    path = path.split(".");
    const _obj = getIn(obj, path);

    if (isKey && !_obj) {
      const newPath = path.slice();
      newPath.pop();
      if (!getIn(obj, newPath)) {
        const _obj2 = setIn(obj, newPath, {});
        return setIn(_obj2, path, "");
      }
      return setIn(obj, path, "");
    }
    if (isKey) {
      let newPath = path.slice();
      newPath[newPath.length - 1] = value;

      const objWithoutPath = removeIn(obj, path);

      return setIn(objWithoutPath, newPath, _obj);
    }

    return setIn(obj, path, value);
  }

  removeValue(obj, path) {
    return removeIn(obj, path.split("."));
  }

  renderRemove(parent) {
    const { mode, removeClass, showRemoveContent } = this.props;

    if (mode !== "FREE") return;

    return (
      <span
        onClick={() => this.onRemoveValue(parent)}
        className={"remove " + removeClass}
      >
        {showRemoveContent && "X"}
      </span>
    );
  }

  renderObject(object, parent = "") {
    if (!object) return;
    const { mode, inputClass, childClass } = this.props;

    return Object.keys(object)
      .sort()
      .map((parentName, index) => {
        const _parent = parent ? `${parent}.${parentName}` : parentName;
        const isParent =
          object[parentName] !== null && typeof object[parentName] === "object";

        return (
          <div
            key={index}
            className={isParent ? "parent" : "child " + childClass}
          >
            <input
              type="text"
              className={inputClass}
              value={parentName}
              onChange={e => this.onChangeValue(e, _parent, true)}
              readOnly={mode !== "FREE"}
            />

            {isParent ? (
              <>
                {this.renderRemove(_parent)}
                {this.renderObject(object[parentName], _parent)}
              </>
            ) : (
              <>
                <input
                  type="text"
                  className={inputClass}
                  value={object[parentName]}
                  onChange={e => this.onChangeValue(e, _parent)}
                  readOnly={mode === "READ"}
                />
                {this.renderRemove(_parent)}
              </>
            )}

            {mode === "FREE" && (isParent || !object[parentName]) && (
              <input
                type="text"
                className={"new-child " + inputClass}
                onKeyDown={e => this.addParent(e, _parent)}
              />
            )}
          </div>
        );
      });
  }

  render() {
    const { object, mode, inputClass } = this.props;
    return (
      <div className="object-editor">
        {this.renderObject(object)}
        {mode === "FREE" && (
          <input
            type="text"
            className={inputClass}
            onKeyDown={this.addParent}
          />
        )}
      </div>
    );
  }
}

App.defaultProps = {
  object: {},
  onChange: () => {},
  mode: "FREE",
  inputClass: "",
  childClass: "",
  removeClass: "",
  showRemoveContent: true
};

App.propTypes = {
  object: PropTypes.object,
  onChange: PropTypes.func,
  mode: PropTypes.oneOf(["FREE", "READ", "UPDATE"]),
  inputClass: PropTypes.string,
  childClass: PropTypes.string,
  removeClass: PropTypes.string,
  showRemoveContent: PropTypes.bool
};

export default App;
