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
    },
  };

  const cfg = {
    mode: 'FREE'
  };

  window.objectEditor = new ObjectEditor("object-editor", testObject, cfg);
}

window.ObjectEditor = ObjectEditor;
