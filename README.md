# Object Editor

Object Editor is a web component tool to view and edit Javascript Objects.

## Instalation

Import *Object-Editor* from you site.

``` example
<script src="https://cdn.jsdelivr.net/gh/JABvzla/object-editor/dist/object-editor.alpha.0.0.0.min.js" crossorigin="anonymous"></script>
```

Now initialize ObjectEditor passing by parameters an element `id` and optionally any js object.

``` example
<div id="object-editor"></div>
<script>
    var objectEditor = new ObjectEditor("object-editor", { greetings: "Hello World!"});
</script>
```

## Configuration

`ObjectEditor` receive three parameters an element `id`, `object` to be render and `configuration`, this last two parameters are be optional.

``` example
<div id="object-editor"></div>
<script>
    var objectEditor = new ObjectEditor("object-editor", { greetings: "Hello World!"}, { mode: 'UPDATE' });
</script>
```

The configuration's object may accept the following properties.

| Name     | Default | Description |
|----------|---------|-------------|
| object   |    -    | Object to be render |
|  mode    |  FREE   | Mode of edition can be `FREE` `READ` `UPDATE`|
|inputClass|    -    | Add extra css Class to inputs elements |
|childClass|    -    |Add extra css Class to child wrapper elements |
|removeClass|   -    |Add extra css Class to remove wrapper element  |
|showRemoveContent| true | Show or hide `X` character on remove button |

## Edition Mods

| MODE                            | FREE | UPDATE | READ |
|---------------------------------|------|--------|------|
| Add parent and children props   |   X  |    -   |   -  |
| Update values on children props |   X  |    X   |   -  |
|                                 |      |        |      |

The mode can be changed dynamically anytime.

``` example
<div id="object-editor"></div>
<script>
    var objectEditor = new ObjectEditor("object-editor", { greetings: "Hello World!"}, { mode: "READ" });
    objectEditor.mode = "FREE";
</script>
```

## Getting and Setting changes
At any time you can `get` and `set` the object rendered, just only need to access the `object` like following example.

``` example
<div id="object-editor"></div>
<script>
    var objectEditor = new ObjectEditor("object-editor", { greetings: "Hello World!"});
    console.log(objectEditor.object);

    objectEditor.object = { greetings: "Hello Jab!", name: "Jab!" };
    console.log(objectEditor.object);
</script>
```

When object is `set` the configuration is ignored, for example if mode is `READ` it will be changed anyway.
