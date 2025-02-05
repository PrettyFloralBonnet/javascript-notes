## Object methods and `this`

Objects are usually created to represent entities of the real world (users, orders etc.). In the real world, a user can act: add something to cart, log in, log out etc.

In **object oriented programming** (or OOP) -- a code writing paradigm emphasizing the use of objects as representations of entities -- actions are represented by functions stored as properties. A function that is a property of an object is referred to as a **method**.

Here's one way to add a function as an object method:

```js
let user = {
    name: 'John',
    age: 30
};

user.greet = function() {
    console.log("Hello!");
};
```

That is quite verbose, so here's a shorthand way (not completely identical, but usually actually preferred):

```js
let user = {
    name: 'John',
    age: 30,
    greet() {
        console.log("Hello!");
    }
};
```

## `this` in methods

It's common for an object method to need access to the information stored in the object itself. The `this` keyword allows for such access. The value of `this` is the object "before the dot" - the one used to call the method.

It is possible to access the object without using `this`, by referencing it via an outer variable, but such code is unreliable (e.g. if the object reference is copied to another variable and then the object is overwritten).

## `this` is not bound

`this` can be used by any function. Its value is evaluated during runtime, and it can be anything.

The same function can have a different `this` when called by different objects. It can even be referenced without an object at all:

```js
function thisWithNoObject() {
    console.log(this);
}

thisWithNoObject()  // undefined
```

Without strict mode, the value of `this` in the example above would be the global object (`window` in the browser).

In most cases, using `this` without an object is a mistake. However, it also means `this` is not bound to anything, and a function utilizing it can be used by different objects, which offers a lot of flexibility.

## `this` in arrow functions

If we reference `this` from within the scope of an arrow function, its value will be taken from **the immediate outer context**:

```js
let oldMeme = {
    name: 'Commander Shepard',
    location: 'Citadel',
    getDiscount() {
        let endorse = () => {
            console.log(
                `I'm ${this.name}, and this is my favorite store
                on the ${this.location}.`
                );
        };
        endorse();
    }
};

oldMeme.getDiscount();  
// "I'm Commander Shepard, and this is my favourite store on the Citadel.
```

## Exercises

### Calculator

Create an object "calculator" with three methods:

* `read()` prompts for two values and saves them as object properties
* `sum()` returns the sum of saved values
* `mul()` multiplies saved values and returns the result

Solution:

```js
let calculator = {
    read() {
        this.first = +prompt('Enter first number: ', '');
        this.second = +prompt('Enter second number: ', '');
    },
    sum() {
        return this.first + this.second;
    },
    mul() {
        return this.first * this.second;
    }
};
```

### Chaining

This `ladder` object allows to "go" up and down, modifying the value of `step` along the way:

```js
let ladder = {
    step: 0,
    up() {
        this.step++;
    },
    down() {
        this.step--;
    },
    showStep() {  // shows the current step
        console.log(this.step);
    }
};
```

However, calls need to be made in sequence:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep();  // 1
```
Modify the code to make the calls chainable, like this:

```js
ladder.up().up().down().showStep();
```

Solution:

```js
let ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep() {
        console.log(this.step);
        return this;
    }
};
```
