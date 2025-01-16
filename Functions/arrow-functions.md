# Arrow functions, revisited

When coding in JavaScript, you will often encounter situations where a small function is needed to be executed somewhere else (e.g. `arr.forEach(func)`, `setTimeout(func)` etc.).

In such cases, we usually don't want to leave the current context. That's where arrow functions come in handy.

## Arrow functions have no `this`

If `this` is accessed from within an arrow function, it is taken from the outside. E.g. they can be used to iterate over an object property from within an object method:

```js
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach(  // this refers to group, not showList()
            student => console.log(this.title + ': ' + student)
        );
    }
};

group.showList();
```

Another resulting limitation is that arrow functions cannot be used as constructors (with the `new` operator).

## Arrow functions have no `arguments` variable

That is handy for decorators, when we need to forward a call with the current `this` and `arguments`:

```js
function defer(f, ms) {
    return function () {
        setTimeout(() => f.apply(this, arguments), ms)
    };
}

function sayHi(who) {
    console.log('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John");
```

Here's what the same thing would look like without an arrow function:

```js
function defer(f, ms) {
    return function (...args) {
        let context = this;
        setTimeout(function () {
            return f.apply(context, args);
        }, ms);
    };
}
```

Note how additional variables `args` and `context` had to be created so that the function inside `setTimeout` could take them.

## Arrow functions don't have `super`

This will be explored in the chapter [Class inheritance](/Classes/class-inheritance.md).
