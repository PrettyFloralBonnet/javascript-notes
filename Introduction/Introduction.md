## What is JavaScript

JavaScript was initially created to "make web pages alive". JavaScript scripts (programs) can be written directly into a web page's HTML, run automatically as the page loads, and they don't need any special preparation or compilation to run.

When JS was created, it was initially called LiveScript, but it was later renamed to "JavaScript" due to the popularity of Java (despite having basically nothing in common with that language). JS is also sometimes referred to as ECMAScript due to the name of its standards specification, [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/).

Modern JS can be executed in the browser, on a server, and generally on any device equipped with a JavaScript Engine (e.g. V8, SpiderMonkey). The engine parses the script and converts it into machine language, which is then executed. Engines apply optimizations at every step of the process.

## JavaScript capabilities

JS does not provide low-level access to memory or CPU, because it was initially created for browsers, which do not require it. However, its capabilities depend on the environment it's running in (for instance, node.js supports functions that allow JS to read and write arbitrary files, perform network requests etc.).

Browser JS is able to:

* Add new HTML to the page, change the existing content, modify styles etc.
* React to user actions (mouse clicks, pointer movements, key presses etc.)
* Send requests to remote servers, download and upload files (AJAX, Comet)
* Get and set cookies, prompt the user with questions, show messages
* Remember data on the client side (local storage)

JS capabilities in the browser are limited for the sake of user safety. Webpage JS cannot read or write arbitrary files on the HDD, copy them, or execute programs. It has no direct access to OS functions. Modern browsers allow JS to work with files, but the access is limited to specific user actions, such as dropping a file into a browser window or selecting it via an `<input>` tag. There are ways to interact with devices such as a microphone or camera, but they require explicit permission from the user.

Different tabs or windows generally do not know about each other. JS may be used in one window to open another, but the script from one page cannot access another if they come from different sites (different domain, protocol or port). This is called **Same Origin Policy**. To work around it, both pages must agree to exchange data and contain specific JS code to handle it. Thus, the ability of JS to receive data from other sites/domains is purposefully crippled, and requires explicit agreement from the remote side, expressed in HTTP headers.

Modern browsers allow plugins or extensions which may ask for extended permissions. Moreover, such limits do not exist for server-side JS.

## Transpiled languages

Many programming languages have been adapted to be converted (transpiled) to JS. Some were built "on top" of it. For example, TypeScript adds strict data typing to JS.