import ObjectEditor from './ObjectEditor';

if (process.env.NODE_ENV === "development") {
  const testObject = 
  {
    user: {
      personal: {
        name: "jose",
        lastName: "bonito"
      },
      param1: "value"
    },
    param2: "value",
    prop2: {
      param3: "value",
      prop: ""
    },
  };

  const cfg = {
    mode: 'FREE',
    inputClass: 'form-control mt-1',
    childClass: 'input-group',
    removeClass: 'custom-remove mt-1 oi oi-delete',
    showRemoveContent: false
  };

  window.objectEditor = new ObjectEditor("object-editor", testObject, cfg);
}

window.ObjectEditor = ObjectEditor;
