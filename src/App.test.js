import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App object={{}} updateObject={()=> {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("setToValue should be assign value deep in object", () => {
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
        lastName: "hola",
        astrid: "bonito"
      },
      param1: "value"
    },
    param2: "value",
    prop2: {
      param3: "value"
    }
  };

  const wrapper = shallow(<App object={{}} updateObject={()=> {}} />).instance();

  const result = wrapper.setToValue(testObject, "hola", "user.personal.lastName");

  expect(expectResult).toEqual(result);
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

  const wrapper = shallow(<App object={{}} updateObject={()=> {}} />).instance();

  const result = wrapper.removeValue(testObject, "user.personal.lastName");

  expect(expectResult).toEqual(result);
});
