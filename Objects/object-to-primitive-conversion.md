## Object to primitive conversion

JS doesn't allow to customize how operators work on objects (it's impossible to implement a special object method to overwrite the way addition works, for example).

When objects are added, substracted, printed etc., they are automatically converted to primitive types first. The operation is then carried out on these primitive types, and results in a primitive value.

Most operations like this in JS result from coding errors (though there are exceptions). Let's go over how these conversions would go anyway.

## Conversion rules

In the boolean context, all objects are `true`, so there is no boolean conversion. Only numeric and string conversions exist.

Numeric conversion takes place when we subtract objects or apply mathematical functions. For example, **date objects** can be subtracted. The result of `date1 - date2` is the time difference between the two dates.

String conversion usually takes place when we output an object using a function such as `alert(obj)`, or through a similar action.

## Conversion hints

There are three kinds of object to primitive conversion, denoted by their respective "hints": `"string"`, `"number"` and `"default"`.

They are selected by the JS engine based on the operation performed on the object. If the operation is expected to produce a string, the hint `"string"` is used. If it's a mathematical operation, the hint `"number"` is used. In rare cases when the operator is unsure what kind of conversion to expect (such as with a binary +, or a comparison using ==), the `"default"` conversion takes place. To execute it, JS tries to find and call three object methods:

* `obj[Symbol.toPrimitive](hint)`, if it exists
* otherwise, if the conversion hint is "string", `obj.toString()` or `obj.valueOf()`, whichever exists
* otherwise, if the hint is "number" or "default", try:
`obj.valueOf()` or `obj.toString()`, whichever exists

The built-in symbol `Symbol.toPrimitive` should be used to name the conversion method:

```js
obj[Symbol.toPrimitive] = function(hint) {
    // the code to convert the object to a primitive
    // it must return a primitive value
    // hint = either "string", "number" or "default"
}
```

For example:

```js
let user = {
    name: "John",
    money: 1000,

    [Symbol.toPrimitive](hint) {
        console.log(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}"}` : this.money;
    }
};
```

This conversion will behave in the following way:

```js
console.log(user);        // hint: string --> {name: "John"}
console.log(+user);       // hint: number --> 1000
console.log(user + 500);  // hint: default --> 1500
```

If there is no conversion method marked with `Symbol.toPrimitive`, the JS engine tries to find methods `toString`, and `valueOf`. These methods are basically ancient at this point, and provide an "old school" way to implement the conversion.

In practice, it's often enough to implement only the `obj.toString()` as a "catch-all" method for all conversions that return a human-readable representation of the object (e.g. for logging or debugging purposes).
