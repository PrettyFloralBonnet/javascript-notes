// ----- Arrow functions revisited -----

// When coding in JavaScript, you will often encounter situations where a small function is needed
// to be executed somewhere else (e.g. arr.forEach(func), setTimeout(func) and more).

// Functions in JS are very much intended to be passed around, usually without their current context.
// That's where arrow functions come in handy.

// Arrow functions have no *this*

// If *this* is accessed within an arrow function, it is taken from the outside.
// E.g. they can be used to iterate over an object property from within an object method:

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

// Another result is that arrow functions cannot be used as constructors (with the 'new' operator).

// Arrow functions have no arguments (of their own)

// That is handy for decorators, when we need to forward a call with the current this and arguments:

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

// The same without an arrow function would look like:

function defer(f, ms) {
    return function (...args) {
        let context = this;
        setTimeout(function () {
            return f.apply(context, args);
        }, ms);
    };
}

// Note how additional variables args and context had to be created so that the function
// inside setTimeout could take them.

// Arrow functions don't have super

// This will be explored more in the chapter Class inheritance.
