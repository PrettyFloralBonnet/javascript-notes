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
