import ObjectEditor from './ObjectEditor';

if (process.env.NODE_ENV === "development") {
  const testObject = {
    user: {
      personal: {
        name: "jose",
        lastName: "bonito"
      }
    }
  };

  window.objectEditor = new ObjectEditor("object-editor", testObject);
}

window.ObjectEditor = ObjectEditor;
