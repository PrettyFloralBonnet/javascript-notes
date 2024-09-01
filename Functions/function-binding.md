// ----- FUNCTION BINDING -----

// When object methods are passed as callbacks (e.g. to setTimeout), *this* is lost:

let user = {
    firstName: "John",
    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};

setTimeout(user.sayHi, 1000);  // undefined

// The reason for the undefined is setTimeout got the function user.sayHi separately from the object.
// This is a known problem, but it can be fixed.

// Solution 1: a wrapper

// The simplest solution is to use a wrapping function:

let user = {
    firstName: "John",
    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};

setTimeout(function () {
    user.sayHi();  // Hello, John!
}, 1000);
  
// Now it works, because it receives user from the outer lexical environment, and then calls the method normally.
// Shorter version:
  
  setTimeout(() => user.sayHi(), 1000);  // Hello, John!
  
// However, if the user variable is reassigned, the function will reference the wrong object.
// The next solution guarantees such a thing won't happen.

// Solution 2: bind

let boundFunc = func.bind(context);  // simplified syntax

// The result of func.bind(context) is a special function-like object that is callable as a function,
// and transparently passes the call to func, while setting this equal to the provided context argument.
// In other words, calling boundFunc is like calling func, but with a fixed *this*:

let user = {
    firstName: "John"
};

function func() {
    console.log(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); // John

// It also works with object methods:

let user = {
    firstName: "John",
    sayHi() {
        console.log;(`Hello, ${this.firstName}!`);
    }
};

let sayHi = user.sayHi.bind(user);
sayHi();  // Hello, John!
setTimeout(sayHi, 1000);  // Hello, John!
  
// Even if the value of user changes within 1 second, sayHi uses the pre-bound value,
// which is a reference to the old user object.
  
// We take the method user.sayHi and bind it to user. The sayHi variable is a bound function
// and it can be called alone or passed to setTimeout. Regardless, the context will be correct.
  
// Arguments are passed as is -- only this is fixed by bind:

let user = {
    firstName: "John",
    say(phrase) {
        console.log(`${phrase}, ${this.firstName}!`);
    }
};

let say = user.say.bind(user);

say("Hello");  // Hello, John ("Hello" argument is passed to say)
say("Bye");  // Bye, John ("Bye" is passed to say)

// Note: a function cannot be rebound (the bound function object only remembers the context
// at the time of creation). Moreover, the result of bind is an object separate from the original.
  
// bindAll -- for convenience
  
// If an object has many methods that need to be passed around a lot, they can all be bound in a loop:
  
for (let key in user) {
    if (typeof user[key] == 'function') {
        user[key] = user[key].bind(user);
    }
}
  
// JavaScript libraries also provide functions for convenient mass binding, e.g.
// _.bindAll(object, methodNames) in lodash.

// Partial function application

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
