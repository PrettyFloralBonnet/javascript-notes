# Function binding

When object methods are passed as callbacks (e.g. to `setTimeout`) separately from the object itself, `this` is lost:

```js
let user = {
    firstName: "John",
    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};


setTimeout(user.sayHi, 1000);  // Hello, undefined!
```

The reason is that `setTimeout` received the function `user.sayHi()` separately from the object.

The `setTimeout` method has a special behaviour. In the browser, it sets `this` to `window`. In Node.js, `this` becomes a timer object. In the example above, in the browser, `this.firstName` becomes `window.firstName`, which doesn't exist.

So, how to make sure the passed method will be called in the right context?

### Solution: using a wrapper

The simplest solution is to use a wrapping function:

```js
let user = {
    firstName: "John",
    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};

setTimeout(function () {
    user.sayHi();  // Hello, John!
}, 1000);
```

Now everything works, because it `setTimeout` receives the entire `user` object from the outer lexical environment, and then calls the method normally.

Shorter syntax for the above:

```js
setTimeout(() => user.sayHi(), 1000);  // Hello, John!
```

However, if the `user` value is changed before `setTimeout` is triggered, the function will reference the wrong object.

The next solution guarantees such a thing won't happen.

### Solution: using `bind`

Functions provide a built-in method `bind`, which allows for the context to be set.

```js
let boundFunc = func.bind(context);  // simplified syntax
```

The result of `func.bind(context)` is a special function-like object, that is callable as a function, and transparently passes the call to `func`, while setting `this` to the provided `context`.

In other words, calling `boundFunc` is like calling `func`, but with an explicitly set `this`.

```js
let user = {
    firstName: "John"
};

function func() {
    console.log(this.firstName);
}

let funcUser = func.bind(user);

funcUser(); // John
```

All arguments are passed "as is" to the original function:

```js
let user = {
    firstName: "John"
};

function func(phrase) {
  console.log(`${phrase}, ${this.firstName}`);
}

let funcUser = func.bind(user);

funcUser("Hello"); // Hello, John
```

It also works with object methods:

```js
let user = {
    firstName: "John",
    sayHi() {
        console.log;(`Hello, ${this.firstName}!`);
    }
};

let sayHi = user.sayHi.bind(user);

sayHi();  // Hello, John!
```

Even if the value of `user` changes, the method will use the previously bound value:

```js
user = {};

setTimeout(sayHi, 1000);  // Hello, John!
```

We take the method `user.sayHi()` and bind it to `user`. `sayHi` is a bound function. It can be called alone, or passed to `setTimeout`. The context will be correct regardless.
  
#### Convenience method: `bindAll()`
  
If an object has many methods, and we need to pass it around a lot, all of that object's methods can be bound, using a loop:

```js
for (let key in user) {
    if (typeof user[key] == 'function') {
        user[key] = user[key].bind(user);
    }
}
```

JavaScript libraries also provide functions for convenient mass binding, e.g. [`_.bindAll(object, methodNames)`](https://lodash.com/docs#bindAll) in Lodash.

## Partial functions

// Arguments can be bound in the same way *this* can:

// let bound = func.bind(context, [arg1], [arg2], ...);

// Given a multiplication function multiply(a,b)...

function multiply(a, b) {
    return a * b;
}

// ...let's use bind to create a function double():

let double = multiply.bind(null, 2);

console.log(double(3));  // = multiply(2, 3) = 6
console.log(double(4));  // = multiply(2, 4) = 8
console.log(double(5));  // = multiply(2, 5) = 10

// The call to multiply.bind(null, 2) creates a new function double() that passes calls to multiply,
// fixing null as the context and 2 as the first argument. Subsequent arguments are passed as they appear.

// This is referred to as partial function application -- we create a new function by fixing some
// parameters of the existing one.

// Partial application is useful when we have a very generic function and want a less universal variant for convenience
// (e.g. we have a function send(from, to, text), but inside of a user object we may want to use a partial variant of it
// like sendTo(to, text) that always sends from the current user).

// Going partial without context

// The native bind() does not allow to fix arguments only, without context. However, a function which does allow it
// it can be easily implemented:

function partial(func, ...argsBound) {
    return function(...args) {
        return func.call(this, ...argsBound, ...args);
    }
}

let user = {
    firstName: "John",
    say(time, phrase) {
        console.log(`[${time}] ${this.firstName}: ${phrase}!`);
    }
};

user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");  // [10:00] John: Hello!

// The result of partial() is a wrapper that calls func with the same context it has received (for user.sayNow
// it's user), arguments from the partial call (in that case, the date and hour) and the arguments given to
// the wrapper ("Hello").

// The lodash library already contains an implementation of this (_.partial).

// TASK: The call to askForPassword() in the code below should check the password
// and then call user.loginOk/loginFail, depending on the answer.
// However, currently it results in an error. Why?
// Fix the call without changing the code in the function or the user object.

function askForPassword(ok, fail) {
    let password = prompt("Password?", '');
    if (password == "rockstar") ok();
    else fail();
}

let user = {
    name: 'John',

    loginOk() {
        console.log(`${this.name} logged in`);
    },

    loginFail() {
        console.log(`${this.name} failed to log in`);
    },

};

askForPassword(user.loginOk, user.loginFail)  // error: this is not defined

// -->

askForPassword = askForPassword.bind(user);
askForPassword(user.loginOk, user.loginFail);

// or:

askPassword(user.loginOk.bind(user), user.loginFail.bind(user));

// or:

askPassword(() => user.loginOk(), () => user.loginFail());  // no context for arrow functions

// TASK: The user object from aboce was modified. Now instead of two functions loginOk/loginFail,
// it only has a single function user.login(true/false).

// What should be passed to askPassword in the code below, so that it calls user.login(true) as ok
// and user.login(false) as fail?

// Like before, only modify the call.

function askPassword(ok, fail) {
    let password = prompt("Password?", '');
    if (password == "rockstar") ok();
    else fail();
}

let user = {
    name: 'John',

    login(result) {
        console.log(this.name + (result ? ' logged in' : ' failed to log in'));
    }
};

// -->

askPassword(user.login.bind(user, true), user.login.bind(user, false));

// or:

askPassword(() => user.login(true), () => user.login(false));
