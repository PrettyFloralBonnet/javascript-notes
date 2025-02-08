# Introduction to modules

As the application grows bigger, it makes sense to split it into multiple files. These files are called **modules**. A module may contain a class or a library of functions for a specific purpose.

A long time ago, when scripts were small, JS existed without a language level module syntax. Back then, it wasn't a problem.

But as scripts became more and more complex, the community invented a variety of ways to organize code into modules.

Some historical module systems include:

* AMD (Asynchronous module definition) - one of the most ancient systems, initially implemented by the [RequireJS](https://requirejs.org/) library
* [CommonJS](https://wiki.commonjs.org/wiki/Modules/1.1) - the module system created for an early version of Node.js
* [UMD](https://github.com/umdjs/umd) - an early universal module system, compatible with both of the above

The language level module system first appeared in 2015 as a standard, in ES6. It has gradually evolved since then and it is now supported by all major browsers and in Node.js.

Something that is still used to this day is the `require` keyword (not to be confused with RequireJS), which is part of the CommonJS module system. It loads modules synchronously (code execution will pause until the module is loaded and executed). `require` is a function, so it can be used anywhere in the code. It is executed at runtime (so the code is only loaded when it is needed), and can be used for single and multiple imports.

This is all pretty much in contrast to `import`, the modern way of loading modules, which is asynchronous, is can only be used at the top level, it is executed as soon as the importing module is loaded into memory, and it can only be used for single imports.

But first...

## What is a module?

A module is just a file. It can be a single script. Or something else.

Modules can **load each other** using directives `export` and `import`, to interchange functionality.

`export` keyword labels variables and functions that should be accessible from outside of the current module. `import` keyword allows the import of functionality from other modules.

For example:

```js
export function sayHi(username) {
    console.log(`Oh hi, ${username}!`);
}
```

In another file, we can now import that function:

```js
// main.js

import { sayHi } from './sayHi.js';

sayHi('Mark');  // Oh hi, Mark!
```

The `import` directive loads the module by the path relative to the current file, and assigns the exported function to the corresponding variable.

## Core module features

These are true both for browser and server-side JS.

### `use strict` is always enabled

Modules always work in strict mode (so e.g. assigning to an undeclared variable will result in an error).

### Module level scope

Each module has its top level scope - top level variables and functions from a module are not seen in other scripts. Modules should `export` what is to be accessible from the outside, and `import` anything they need.

### Module code is evaluated only the first time when it is imported

If the same module is imported into multiple other modules, its code is executed only once, on the first import. Then, all further importers receive the exports directly.

This **one-time evaluation** has important consequences. If executing module code has side effects (e.g. showing a message), importing it multiple times will only trigger these consequences once.

Also, exported objects will be shared between modules that import them (multiple modules may end up referencing the same object). If changes are made to the object in one module, this will also affect that object in other modules. This is actually convenient, because it makes modules configurable. For example:

1. A module exports a configuration object
2. The object is initialized on first import (e.g. object properties are written to by a top level application script)
3. Further imports use the module.

### In a module, `this` is `undefined`

Top level `this` is `undefined` in a module. In non-module scripts, it's a global object.
