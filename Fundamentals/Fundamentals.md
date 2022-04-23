# Hello, world!
JS can be inserted into any part of an HTML document with the help of the `<script>` tag.

```javascript
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

The `<script>` tag has a few attributes that are rarely used anymore, but can be found on old code:
* type `<script type=...>`
* language `<script language=...>`