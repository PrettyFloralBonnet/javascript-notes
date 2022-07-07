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
