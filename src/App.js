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
    this.onParentChange = this.onParentChange.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  addParent(e, path) {
    // if (e.key === "Enter") this.onChangeValue(e, path);
  }

  onParentChange(e) {}

  onChangeValue(e, path, isKey = false) {
    this.props.updateObject(
      this.setToValue(this.props.object, e.target.value, path, isKey)
    );
  }

  onRemoveValue(path) {
    this.props.updateObject(this.removeValue(this.props.object, path));
  }

  /**
   * Add or Update value to an object.
   *
   * @param  {Object} obj - Obj Object to be updated.
   * @param  {string} value - Value Value to be added.
   * @param  {string} path - Path to update, separated with dot.
   * @param  {boolean} isKey - If true is a key else value. Default is false.
   *
   * @returns {Object} Return a new object updated.
   */
  setToValue(obj, value, path, isKey) {
    path = path.split(".");
    const _obj = getIn(obj, path);

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

  renderObject(object, parent = "") {
    if (!object) return;

    return Object.keys(object)
      .sort()
      .map((parentName, index) => {
        const _parent = parent ? `${parent}.${parentName}` : parentName;
        const isParent =
          object[parentName] !== null && typeof object[parentName] === "object";

        return (
          <div key={index} className={isParent ? "parent" : "child"}>
            <input
              type="text"
              value={parentName}
              onChange={e => (this.onChangeValue(e, _parent, true))}
            />

            {isParent ? (
              <>
                <label onClick={() => this.onRemoveValue(_parent)}>X</label>
                {this.renderObject(object[parentName], _parent)}
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={object[parentName]}
                  onChange={e => this.onChangeValue(e, _parent)}
                />
                <label onClick={() => this.onRemoveValue(_parent)}>X</label>
              </>
            )}

            {isParent && (
              <input type="text" onKeyDown={e => this.addParent(e, _parent)} />
            )}
          </div>
        );
      });
  }

  render() {
    const { object } = this.props;

    return (
      <div className="object-editor">
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
