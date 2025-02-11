# Export and import

Export and import directives have several syntax variants.

## Export before declarations

Any declaration can be labeled as an export by placing `export` before the variable, function or class.

```js
export let months = [ 'Jan', 'Feb', 'Mar' ];

export const YEAR = 2015;

export class User {
    constructor(name) {
        this.name = name;
    }
}
```

## Export separately from declarations

Variables, functions and classes can also be exported separately.

```js
function sayHi(user) {
    console.log(`Hello, ${user}!`);
}

function sayBye(user) {
    console.log(`Bye, ${user}!`);
}

export { sayHi, sayBye };
```

## `import *`

If there's a lot to import from a module, we can import everything as an object using `import * as <obj>`.

```js
// main.js

import * as say from './say.js';

say.sayHi('John');
say.sayBye('John');
```

However, explicitly listing the imports allows for shorter names and gives a better overview of the code structure, which makes maintenance and refactoring easier.

## `import` as

We can use `as` to import things under different names.

```js
// main.js

import { sayHi as hi, sayBye as bye } from './say.js';
```

## `export` as

Similar syntax exists for exports.

```js
// say.js
export { sayHi as hi, sayBye as bye };
```

Now `hi` and `bye` are official names used by other modules:

```js
// main.js

import * as say from './say.js';

say.hi('John');
say.bye('John');
```

## Default export

In practice, two types of modules are most commonly used: modules that contain a library (a collection of functions), and modules that declare a single entity (e.g. a module `user.js` which only exports `class User`).

For the most part, the second approach is preferred (so that everything has its own module).

Modules provide a special `export default` syntax to make the "one thing per module" approach look better.

```js
// user.js

export default class User {
    constructor(name) {
        this.name = name;
    }
}
```

There can only be one default export per file. Making an export default **allows it to be imported without curly braces**, which looks nicer:

```js
// main.js

import User from './user.js';
```

Technically a single module can have both default and named imports, but in practice it's best to avoid mixing the two.

Since one default export per file is the maximum, the exported entity may have no name:

```js
// no class name
export default class {
    constructor() { ... }
}
```

```js
// no function name
export default function(user) {
    console.log(`Hello, ${user}!`);
}
```

Without `default`, such export would result in an error.

### The default name

In some situations the `default` keyword is used to reference the default export, e.g. to export a function separately from its definition:

```js
function sayHi(user) {
    console.log(`Hello, ${user}!`);
}

export { sayHi as default };
```

Or, if a module contains a default export and a named export:

```js
// user.js
export default class User {
    constructor(name) {
        this.name = name;
    }
}

export function sayHi(user) {
    console.log(`Hello, ${user}!`);
}
```

...here's how to import the default export along with the named one:

```js
// main.js

import { default as User, sayHi } from './user.js';
```

Lastly, if `import *` is used, the imported object will have the `default` property, which will be the default export:

```js
// main.js

import * as user from './user.js';

let User = user.default;
```

In general, named exports are explicit. They exactly name what will be imported, which is good. With default exports, the same thing can be imported in different places under different names, which may lead to misunderstandings.

To keep the code consistent, the rule of thumb is that imported variables should correspond to file names (e.g. `import User from './user.js'`, `import LoginForm from './loginForm.js'` etc.).

Still, sometimes teams may agree to only use named exports, even if a module only contains a single entity.
