## Conditional branching

Sometimes different actions have to be performed based on different conditions.

## The `if` statement

The `if` statement evaluates the expression in parentheses, converts it into boolean, and executes a block of code if the result is `true`. It may contain an optional `else` block which executes only when the result is `false`. To test seceral variants of a condition, `else if` is used.

```js
let year = prompt('What year was ECMAScript 2015 published?', '');

if (year < 2015) {
    console.log("Later than that.");
} else if (year > 2015) {
    console.log("Sooner than that.");
} else {
    console.log("Correct!");
}
```

## Ternary operator

The question mark operator `?`, also called the **ternary operator** (because it takes three operands), is a shorthand to evaluate a condition and assign a variable based on the result:

```js
let age = prompt('How old are you?', 18);

let accessAllowed = age > 18 ? true : false;
```

The condition is evaluated. If it's truthy, the virst value after the question mark is returned. If it's falsy, the second value is returned.

Ternary operator expressions can be nested.

## The `switch` statement

The `switch` statement can replace multiple `if` checks. It's a more descriptive way to compare a value with multiple variants. The value is checked for strict equality with values in subsequent `case` entries. If a match is found, the code from the corresponding `case` is executed until the `break`, or until the end of the `switch` statement. If there are no matches, the `default` code is executed. If there are no `break` statements, the execution continues to the next case.

```js
let a = 3 + 1;

switch(a) {
    case 3:
        console.log(`Value is lower than target ${a}.`);
        break;
    case 4:
        console.log("The values match.");
        break;
    case 5:
        console.log(`Value is higher than target ${a}.`);
        break;
    default:  // executes if no case matches
        console.log(`No match found for target ${a}.`)
}
```
