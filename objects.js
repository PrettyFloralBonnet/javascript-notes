// ----- OBJECTS: THE BASICS -----

let user = new Object;  // object constructor syntax
let user = {};  // object literal syntax

let user = {
    name: 'John',
    age: 30,
    isAdmin: true,  // trailing comma
};

console.log(user.name);  // dot notation
console.log(user.age);

delete user.isAdmin

console.log(user[age])  // square brackets notation

// computed properties

let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5  // bag.appleComputers = 5
};

// property value shorthand

function makeUser(name, age) {
    return {
        name, // same as name: name
        age   // same as age: age
    };
}

// existence check

let user = {};

console.log(user.noSuchProperty === undefined);  // true
console.log("noSuchProperty" in user)  // false

// the "for...in" loop

let user = {
    name: "John",
    age: 30,
    isAdmin: true
};

for (let key in user) {
    alert(key);  // name, age, isAdmin
    alert(user[key]); // John, 30, true
}

// copying by reference

// a variable stores an address in memory, not the object itself

let user = { name: 'John' };
let admin = user;

admin.name = 'Pete'; // changed by the "admin" reference
alert(user.name); // 'Pete', changes are seen from the "user" reference

// two independent objects are never equal, even if they have identical properties

// Object.assign

let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }

// deep cloning

// https://html.spec.whatwg.org/multipage/structured-data.html#safe-passing-of-structured-data

// lodash, _.cloneDeep(obj)

// TASK: Write the function isEmpty(obj) which returns true if the object has no properties, false otherwise.
// -->

let isEmpty = (obj) => {
    for (let key in obj) {
        return false;
    }
    return true;
};

// TASK: We have an object storing salaries of our team:

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}
  
// Write the code to sum all salaries and store in the variable sum (should be 390 in the example above)
// If salaries is empty, then the result must be 0.
// -->

let calculateSalaries = (salaries) => {
    let sum = 0;
    for (let employee in salaries) {
        sum += salaries[employee];
    }
    return sum;
};

calculateSalaries(salaries);  // 390

// TASK: Create a function multiplyNumeric(obj) that multiplies all numeric properties of obj by 2.

let multiplyNumeric = (obj) => {
    for (key in obj) {
        if (typeof(obj[key]) === "number") {
            obj[key] *= 2;
        }
    }
};

// ----- GARBAGE COLLECTION -----

// The main concept of memory management in JavaScript is reachability.

// Simply put, “reachable” values are the accessible (or somehow usable) ones.
// They are guaranteed to be stored in memory.

// There’s a base set of inherently reachable values that cannot be deleted, e.g.:
//
//     # Local variables and parameters of the current function
//     # Variables and parameters for other functions on the current chain of nested calls
//     # Global variables
//
// These values are called roots.
// Any other value is considered reachable as long a reference (or a chain of references)
// to it exists in the root.

// Note: being referenced (at all) is not the same as being reachable (from a root):
// a group of interlinked objects can become unreachable as a whole.

// There’s a background process in the JavaScript engine called garbage collector.
// It monitors all objects and removes the ones that have become unreachable.

// ----- SYMBOL TYPE -----

// Object property keys may be either of string type, or of symbol type.

// id is a symbol with the description "id"
let id = Symbol("id");

// Symbols are guaranteed to be unique - even if many symbols with the same description are created,
// they are different values.

// Symbols do not autoconvert to strings:

let id = Symbol("id");
alert(id);  // TypeError: Cannot convert a Symbol value to a string

// if we want to use a symbol in an object literal, we need brackets around it:

let user = {
    name: "John",
    [id]: 123
};

// symbols are skipped by for..in and Object.keys():

let user = {
    name: "John",
    age: 30,
    [id]: 123
};

for (let key in user) alert(key);  // name, age (no symbols)

// they are, however, copied over by Object.assign()

// ----- OBJECT METHODS, "THIS" -----

// verbose way
let user = {
    name: 'John',
    age: 30
};

user.greet = function() {
    alert('Hello!');
};

// shorthand way (not fully identical but usually preferred)

let user = {
    name: 'John',
    age: 30,
    greet() {
        alert('Hello!');
    }
};

// An object method often needs to access the information stored in the object.
// To access the object, a method can use the *this* keyword.

let user = {
    name: 'John',
    age: 30,
    greet() {
        alert(`Hi, I am ${this.name}!`)
    }
}

// The value of *this* is evaluated at run-time, depending on the context.
// This means, among other things, that functions utilizing it may be reused with different objects.

// Arrow functions have no *this*

// If we reference *this* from an arrow function, it’s taken from the outer “normal” function:

let oldMeme = {
    name: 'Commander Shepard',
    location: 'Citadel',
    getDiscount() {
        let endorse = () => {
            alert(`I'm ${this.name} and this is my favorite store on the ${this.location}.`);
        };
        endorse();
    }
};

oldMeme.getDiscount();  // I'm Commander Shepard and this is my favorite store on the Citadel.

// TASK: Create an object "calculator" with three methods:
//
//   read() prompts for two values and saves them as object properties
//   sum() returns the sum of saved values
//   mul() multiplies saved values and returns the result
//
// -->

let calculator = {
    read() {
        this.first = +prompt('Enter first number: ', '');
        this.second = +prompt('Enter second number: ', '');
        console.log(`Saved first value: ${this.first}\nSaved second value: ${this.second}`)
    },
    sum() {
        return this.first + this.second;
    },
    mul() {
        return this.first * this.second;
    }
};

// TASK: There’s a ladder object that allows to go up and down:

let ladder = {
    step: 0,
    up() {
        this.step++;
    },
    down() {
        this.step--;
    },
    showStep: function () { // shows the current step
        alert(this.step);
    }
};
  
// Now, if we need to make several calls in sequence, we can do it like this:
  
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
  
// Modify the code to make the calls chainable, like this:
  
ladder.up().up().down().showStep();

// -->

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
    showStep: function () {
        alert(this.step);
        return this;
    }
};

// ----- OBJECT TO PRIMITIVE CONVERSION -----

// When objects are subjected to various operations (maths, printing etc.), they are converted to primitive types.

// In boolean context, all objects are true.

// When mathematical functions are applied to objects, numeric conversion takes place
// (e.g. two Date objects cabn be subtracted, and the result of date1 - date2 
// is the time difference between the two dates)

// When objects are being output (e.g. alert, print), string conversion takes place

// When the operator is unsure what type to expect (binary +, comparison ==), "default" conversion takes place


// To do the conversion, JavaScript tries to find and call three object methods:

obj[Symbol.toPrimitive](hint)  // if such method (with the symbolic key Symbol.toPrimitive) exists
// otherwise if hint is "string", try:
obj.toString()  // and
obj.valueOf()  // whichever exists.
// otherwise if hint is "number" or "default", try:
obj.valueOf() // and
obj.toString()  // whichever exists

// Symbol.toPrimitive

obj[Symbol.toPrimitive] = function(hint) {
    // return a primitive value
    // hint = either "string", "number" or "default"
}

// E.g., implemented by object user:

let user = {
    name: "John",
    money: 1000,

    [Symbol.toPrimitive](hint) {
        alert(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}"}` : this.money;
    }
};

// the conversion will behave in the following way:
alert(user);        // hint: string --> {name: "John"}
alert(+user);       // hint: number --> 1000
alert(user + 500);  // hint: default --> 1500

// If there's no Symbol.toPrimitive, older "ancient" methods, toString and valueOf, will be attempted:

let user = {
    name: "John",
    money: 1000,

    // for hint = "string"
    toString() {
        return `{name: "${this.name}"}`;
    },

    // for hint = "number" or "default"
    valueOf() {
        return this.money;
    }
};

// In practice, it’s often enough to implement only obj.toString() as a “catch-all” method
// for all conversions that return a “human-readable” representation of an object (for logging or debugging purposes).

// ----- CONSTRUCTOR, OPERATOR "NEW" -----

// Constructor function

// The main purpose of constructors is to implement reusable object creation code.

function User(name) {  // constructor function - note the capital letter
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Jack");

alert(user.name);
alert(user.isAdmin);

// When a function is executed with the operator "new", the following steps are performed:
//
//     A new empty object is created and assigned to *this*,
//     The function body executes (usually it modifies *this*, adds new properties to it),
//     The value of *this* is returned.

// Return from constructors

// Constructors do not usually have a return statement.
// If there is a return statement, here are the rules:
//
//    If it's called with an object, the object is returned (instead of *this*)
//    If it's called with a primitive, it’s ignored (and *this* is returned instead)

function BigUser() {
    this.name = "John";
    return { name: "Godzilla" };  // <-- returns this object
}

alert(new BigUser().name);  // Godzilla, got that object

// Parentheses after the function name can be omitted with the "new" operator, provided it has no arguments
// - but doing so is considered bad practice.

// TASK: Create a constructor function 'Calculator' that creates objects with 3 methods:
//
//    read() - prompts for two values and stores them in object properties
//    sum() - returns the sum of these properties
//    mul() - returns the product of these properties
//
// -->

function Calculator() {
    this.read = () => {
        this.firstNumber = +prompt('Enter first number: ', '');
        this.secondNumber = +prompt('Enter second number: ', '')
        console.log(`First number is: ${this.firstNumber}\nSecond number is: ${this.secondNumber}`)
    }
    this.sum = () => {
        return this.firstNumber + this.secondNumber;
    }
    this.mul = () => {
        return this.firstNumber * this.secondNumber;
    }
};

let calculator = new Calculator();
calculator.read();
calculator.sum();
calculator.mul();

// TASK: Create a constructor function Accumulator(startingValue) that creates an object which:
//
// Stores the current value in the property "value" (initialized as startingValue)
// Implements a read() method that prompts for a number and adds it to "value"

function Accumulator(startingValue) {
    this.value = startingValue;
    this.read = () => {
        this.value += +prompt('Enter a number: ', '');
    }
}

let accumulator = new Accumulator(5);
console.log(accumulator.value);
accumulator.read();
console.log(accumulator.value);
