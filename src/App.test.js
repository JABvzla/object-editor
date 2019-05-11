import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
describe("method setToValue", () => {
  it("should be add a new key and value in object", () => {
    const testObject = {
      param1: "value1",
      prop1: {
        param2: "value2"
      }
    };

    const expectResult = {
      param1: "value1",
      prop1: {
        param2: "value2"
      },
      param3: "test"
    };

    const wrapper = shallow(<App />).instance();

    const result = wrapper.setToValue(testObject, "test", "param3");

    expect(result).toEqual(expectResult);
  });

  it("should be add a new parent in object", () => {
    const testObject = {
      param1: "value1",
      prop1: {
        param2: "value2"
      }
    };

    const expectResult = {
      param1: "value1",
      prop1: {
        param2: "value2"
      },
      prop2: ""
    };

    const wrapper = shallow(<App />).instance();

    const result = wrapper.setToValue(testObject, "", "prop2", true);

    expect(result).toEqual(expectResult);
  });

  it("should be add a children on an empty key value", () => {
    const testObject = {
      param1: "value1",
      prop1: ""
    };

    const expectResult = {
      param1: "value1",
      prop1: {
        prop2: ""
      }
    };

    const wrapper = shallow(<App />).instance();

    const result = wrapper.setToValue(testObject, "", "prop1.prop2", true);

    expect(result).toEqual(expectResult);
  });

  it("should be assign value deep in object", () => {
    const testObject = {
      user: {
        personal: {
          name: "jose",
          lastName: "bonito"
        },
        param1: "value"
      },
      param2: "value",
      prop2: {
        param3: "value"
      }
    };

    const expectResult = {
      user: {
        personal: {
          name: "jose",
          lastName: "hola"
        },
        param1: "value"
      },
      param2: "value",
      prop2: {
        param3: "value"
      }
    };

    const wrapper = shallow(<App />).instance();

    const result = wrapper.setToValue(
      testObject,
      "hola",
      "user.personal.lastName"
    );

    expect(result).toEqual(expectResult);
  });

  it("should be update parent name in object", () => {
    const testObject = {
      user: {
        personal: {
          name: "jose",
          lastName: "bonito",
          astrid: "bonito"
        },
        param1: "value"
      },
      param2: "value",
      prop2: {
        param3: "value"
      }
    };

    const expectResult = {
      user: {
        hola: {
          name: "jose",
          lastName: "bonito",
          astrid: "bonito"
        },
        param1: "value"
      },
      param2: "value",
      prop2: {
        param3: "value"
      }
    };

    const wrapper = shallow(<App />).instance();

    const result = wrapper.setToValue(
      testObject,
      "hola",
      "user.personal",
      true
    );

    expect(result).toEqual(expectResult);
  });

  it("should be update key name in object", () => {
    const testObject = {
      user: {
        personal: {
          name: "jose",
          lastName: "bonito",
          astrid: "bonito"
        },
        param1: "value"
      },
      param2: "value",
      prop2: {
        param3: "value"
      }
    };

    const expectResult = {
      user: {
        personal: {
          hola: "jose",
          lastName: "bonito",
          astrid: "bonito"
        },
        param1: "value"
      },
      param2: "value",
      prop2: {
        param3: "value"
      }
    };

    const wrapper = shallow(<App />).instance();

    const result = wrapper.setToValue(
      testObject,
      "hola",
      "user.personal.name",
      true
    );

    expect(result).toEqual(expectResult);
  });

  it("removeValue should be remove value deep in object", () => {
    const testObject = {
      user: {
        personal: {
          name: "jose",
          lastName: "bonito",
          astrid: "bonito"
        },
        param1: "value"
      },
      param2: "value",
      prop2: {
        param3: "value"
      }
    };

    const expectResult = {
      user: {
        personal: {
          name: "jose",
          astrid: "bonito"
        },
        param1: "value"
      },
      param2: "value",
      prop2: {
        param3: "value"
      }
    };

    const wrapper = shallow(<App />).instance();

    const result = wrapper.removeValue(testObject, "user.personal.lastName");

    expect(result).toEqual(expectResult);
  });
});
