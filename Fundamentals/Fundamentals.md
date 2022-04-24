# Hello, world!
JS can be inserted into any part of an HTML document with the help of the `<script>` tag.

```html
<!DOCTYPE HTML>
<html>

<body>

  <p>Before the script...</p>

  <script>
    console.log("Hello, world!");
  </script>

  <p>...After the script.</p>

</body>

</html>
```

However, if there is a lot of code, it's better to put it in a separate file and reference it with the `src` (source) attribute:

```html
<!-- abspath, relative path or url-->
<script src="/path/to/script.js"></script>
```

If the `src` attribute is set, the content of the `<script>` tag is ignored.

The `<script>` tag has a few attributes that are rarely used anymore, but can be found on old code:
* type `<script type=...>`
* language `<script language=...>`

As a rule, only the simplest scripts are put directly into HTML. More complex ones are kept in separate files. These files will be cached by the browser for the performance benefit attained when other pages reference the same script.

# Use strict

When ECMAScript 5 (ES5) appeared in 2009, it added features to JS which modified some of the existing ones. To keep the old code working, most of these modifications were switched off by default, and needed to be explicitly enabled with the `use strict` directive.

When used at the beginning of a script (or sometimes a function), it enables "strict mode" for the entire corresponding scope (so, the script or function).

Nowadays it's rarely necessary to put `use strict` in the code as modern JS features such as modules and classes enable it automatically.

# Variables

The keywords for defining variables in modern JS are `let` and `const`:

```javascript
let message = "Hello!";
let user = "John";

// constants known ahead of runtime
const COLOR_RED = '#F00';
const COLOR_GREEN = "#0F0";
```

Older scripts may contain variables declared with the `var` keyword, which is almost the same as `let`, with some distinctions which will be described later.

Multiple variables can be declared in one line:

```javascript
let user = 'John', age = 25, message = 'Hello'
```

There are two variable name limitations in JS:
1. The name may only contain letters, digits, and the following symbols: `$`, `_`.
2. The first character cannot be a digit.

The `_` character has no special meaning as a variable name (like it does in e.g. python)
