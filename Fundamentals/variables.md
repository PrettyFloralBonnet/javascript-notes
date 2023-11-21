## Variables

The keywords for defining variables in modern JS are `let` and `const`:

```js
let message = "Hello!";
let user = "John";

// constants known ahead of runtime
const COLOR_RED = '#F00';
const COLOR_GREEN = "#0F0";
```

Older scripts may contain variables declared with the `var` keyword, which is almost the same as `let` (with some distinctions which will be described later).

Multiple variables can be declared in one line:

```js
let user = 'John', age = 25, message = 'Hello'
```

There are two variable name limitations in JS:

1. The name may only contain letters, digits, and the following symbols: `$`, `_`.
2. The first character cannot be a digit.

The `_` character has no special meaning as a variable name (except by convention).
