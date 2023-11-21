## Interaction (alert, prompt, confirm)

JavaScript has a number of built-in functions that allow for interaction with the user.

### `alert()`

```js
let message = "Hello!";
alert(message);
```

`alert()` shows a message in a modal window and pauses script execution until "OK" is pressed.

### `prompt()`

```js
result = prompt("What is your name?", "JC Denton");
alert(`Welcome to the coalition, ${result}!`);
```

`prompt()` returns the text from the input field, or `null` if the input was cancelled. The optional second parameter can be used to specify the default value of the input field.

### `confirm()`

```js
question = "Is this podracing?";
result = confirm(`${question}`);
```

`confirm()` shows a modal window with a question and two buttons: "OK" and "Cancel".
It returns `true` if "OK" was clicked, and `false` otherwise.
