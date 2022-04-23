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
