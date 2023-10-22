## Protected fields

In JS, two types of object fields (properties and methods) exist:

* **public** - accessible from anywhere (the external interface)
* **private** - accessible only from inside the class (the internal interface)

Many other languages also have **protected** fields, accessible from inside the class and the classes that extend it, also comprising the internal interface (though in a way that's slightly more accessible than with the fields that are outright private).

Protected fields are not implemented in JS on the language level, but they are emulated out of convenience. Similar to python, prefixing a property name with an underscore `_` makes it clear that such a property should not be accessed from the outside. 

## Private fields

Language-level support for private properties and methods has actually been introduced in a relatively recent proposal.

Private properties start with `#`. They are only accessible from inside the class.
