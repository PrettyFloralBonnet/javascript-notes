// ----- JSON methods, toJSON -----

// JSON (JavaScript Object Notation) is a generalized format used to represent values and objects.
// It was initially made for JavaScript, but many other languages have adopted it since its conception.

JSON.stringify(object)  // converts object to JSON-encoded string
JSON.parse(json)  // converts JSON back into an object

// A JSON-encoded object has some differences from an object literal:
//
// - strings always use double quotes
// - object property names always use double quotes (e.g.: age: 30 becomes "age": 30)

// JSON.stringify can be applied to objects and arrays, as well as some primitive data types
// (strings, numbers, booleans and null).

// JSON is a data-only, language-independent specification,
// so some object properties specific to JavaScript are skipped by JSON.stringify. Those include:
//
// - function methods
// - symbolic properties
// - properties that store undefined
//
// E.g.: the result of calling JSON.stringify with the following object:

let user = {
    sayHi() { console.log('Hello!') },
    [Symbol('id')]: 123,
    something: undefined
};

// ...is going to be a representation of an empty object:

console.log(JSON.stringify(user))  // {}

// Nested objects are supported and converted automatically, as long as there are no circular references.
// Those would result in an error, e.g.:

let room = {
    number: 23
};

let meetup = {
    title: "Conference",
    participants: ["john", "ann"]
};

meetup.place = room;  // meetup references room
room.occupiedBy = meetup;  // room references meetup

JSON.stringify(meetup);  // Error: Converting circular structure to JSON

// The full syntax of JSON.stringify is:

let json = JSON.stringify(value, [replacer, space])

// where value is the value to encode,
// replacer is an array of properties to encode or a mapping function,
// and space is the amount of space to use for formatting.

// Replacer

// The replacer argument is used for excluding and replacing values upon stringification.

let room = {
    number: 23
};

let meetup = {
    title: "Conference",
    participants: [{ name: "John" }, { name: "Alice" }],
    place: room  // meetup references room
};

room.occupiedBy = meetup;  // room references meetup

console.log(JSON.stringify(meetup, ['title', 'participants']));  // {"title":"Conference","participants":[{},{}]}

// However, this is too strict, because now objects in participants are empty, since name is not on the list.
// We can fix that by passing this list as a replacer:

['title', 'participants', 'place', 'name', 'number']

// Now everything except for occupiedBy (which would cause a circular reference) is serialized,
// but the list is very long.
// Fortunately instead of passing an array, we can pass a function as the replacer

console.log(JSON.stringify(meetup, function replacer(key, value) {
    console.log(`${key}: ${value}`);
    return (key == 'occupiedBy') ? undefined : value;
}));

// The replacer function gets every key/value pair (including nested objects and array items)
// and is applied recursively. The value of this inside replacer is the object that contains
// the current property.

// The first call is special: it's made using a special “wrapper object”: {"": meetup}.
// In other words, the first (key, value) pair has an empty key, and the value is the target object
// as a whole. That’s why the first line is ":[object Object]".

// The idea is to provide as much power for replacer as possible: it has a chance to analyze
// and replace/skip even the entire object if necessary.

// Formatting: space

// Space is the number of spaces to use for pretty formatting.

// Previously, all stringified objects had no indents or extra spaces. While that's fine if you want to
// send an object over the network, it's not really human readable.

let user = {
    name: "John",
    age: 25,
    roles: {
        isAdmin: false,
        isEditor: true
    }
};
  
console.log(JSON.stringify(user, null, 2));
/*
  {
    "name": "John",
    "age": 25,
    "roles": {
      "isAdmin": false,
      "isEditor": true
    }
  }
*/

// Custom toJSON

// Similar to the toString method for string conversion, an object may define a custom method
// toJSON, which will be automatically called by JSON.stringify whenever available. E.g.:

let room = {
    number: 23,
    toJSON() {
        return this.number;
    }
};

let meetup = {
    title: "Conference",
    room
};

console.log(JSON.stringify(room));  // 23
console.log(JSON.stringify(meetup));
/*
  {
    "title":"Conference",
    "room": 23
  }
*/

// toJSON is used both for the direct call JSON.stringify(room),
// and also when room is nested in another encoded object.

// JSON.parse

// The JSON.parse() method decodes a JSON string and converts it back to an object.

let value = JSON.parse(str, [reviver]);

// ...where str is the JSON string to parse, and reviver is an optional function(key, value)
// that will be called for each key value pair (and can transform the value).

// Objects and arrays passed to JSON.parse can be as complex as they need to be,
// as long as they conform to the JSON format.

// reviver

// Let's say we received a stringified meetup object from the server:

let meetup = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

/// ...and now we need to deserialize it (to turn back into JavaScript object):

let meetupDeserialized = JSON.parse(meetup);
console.log(meetup.date.getDate());  // error

// It errors out, because the value of meetupDeserialized.date is a string, not a Date object.

// To let JSON.parse know that it should transform that string into a Date, we can pass the so called
// reviving function as the second argument, so that (e.g.) all values are returned as they are,
// but turns dates into Date object:

let meetupDeserialized = JSON.parse(meetup, function (key, value) {
    if (key == 'date') return new Date(value);
    return value;
});

console.log(meetupDeserialized.date.getDate());  // it works now

// This works for nested objects as well:

let schedule = `
{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}
`;

schedule = JSON.parse(schedule, function (key, value) {
    if (key == 'date') return new Date(value);
    return value;
});

console.log(schedule.meetups[1].date.getDate());

// TASK: Turn the user object into JSON and then read it back into a different variable.
// -->

let user = {
    name: "John Smith",
    age: 35
};

let userStringified = JSON.stringify(user);
let userDeserialized = JSON.parse(userStringified);

// TASK: Write a replacer function to stringify every property in the meetup object,
// except for properties that reference meetup itself:

let room = {
    number: 23
};

let meetup = {
    title: "Conference",
    occupiedBy: [{ name: "John" }, { name: "Alice" }],
    place: room
};

// circular references
room.occupiedBy = meetup;
meetup.self = meetup;

let meetupStringified = JSON.stringify(meetup, function replacer (key, value) {
    if (key != '' && value == meetup) return undefined;
    return value;
});

console.log(meetupStringified);
