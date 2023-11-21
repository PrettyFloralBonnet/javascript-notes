## Strict mode

When ECMAScript 5 (ES5) appeared in 2009, it added features to JS which modified some of the existing ones. To keep the old code working, most of these modifications were switched off by default, and needed to be explicitly enabled with the `use strict` directive.

When used at the beginning of a script (or sometimes a function), it enables "strict mode" for the entire corresponding scope (so, the script or function).

Nowadays it's rarely necessary to put `use strict` in the code as modern JS features such as modules and classes enable it automatically.
