## Destructuring assignment

Destructuring assignment is a special syntax that allows us to "unpack" arrays or objects **into individual variables**. Destructuring works well with complex functions that have a lot of parameters, default values etc.

### Array destructuring

```js
let arr = [1, 2];
let [first, second] = arr;

console.log(first);  // 1
console.log(second);  // 2
```

The array itself is not modified.

Unnecessary elements of the array can be ignored using commas:

```js
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
console.log(title);  // Consul
```

To gather the remaining values, an `...` operator can be used:

```js
let [firstName, lastName, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

console.log(name1);  // Julius
console.log(name2);  // Caesar
```

The value of `rest` in this example is an array of elements remaining from the original array:

```js
console.log(rest[0]);  // Consul
console.log(rest[1]);  // of the Roman Republic
console.log(rest.length); // 2
```

Destructuring can be used with any iterable (not just arrays):

```js
let [a, b, c] = "abc";  // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

On the left side, any assignables can be used, including object properties:

```js
let user = {};
[user.name, user.surname] = "Commander Shepard".split(' ');

console.log(user.name); // Commander
console.log(user.surname); // Shepard
```

Destructuring can be used to swap variables:

```js
let prince = "Prince";
let pauper = "Pauper";

// Let's swaps the values
[prince, pauper] = [pauper, prince];

console.log(`${prince} and the ${pauper}`); // Pauper and the Prince
```

If there are fewer elements in the array than there are assignables, the variables with no corresponding value default to `undefined`:

```js
let [firstName, lastName] = [];

console.log(firstName);  // undefined
console.log(lastName);  // undefined
```

Default values can be provided to replace any missing ones:

```js
let [name = "John", surname = "Doe"] = ["Reginald"];
console.log(name);  // Reginald (from the array)
console.log(surname);  // Doe (default)
```

Default values can be more complex expressions or even function calls. They are only evaluated if the corresponding value is not provided.

### Object destructuring

The destructuring assignment also works with plain objects:

```js
let options = {
    resolution: "1920x1080",
    difficulty: "insanity",
    subtitles: true
}

let {resolution, difficulty, subtitles} = options;
```

Note that the left hand side of the assignment needs to be an object-like pattern. Properties of the object are assigned to corresponding variables. The order does not matter.

If we want to assign a property to a variable with a different name, we can specify the mapping between properties and variables:

```js
let {resolution: res, difficulty: df, subtitles: subs} = options;
```
For properties that may be missing, we can set default values (which again can be expressions or even function calls).

If we're only interested in a single property, we can extract it on its own:

```js
let {resolution} = options;
```

Gathering the remaining values is also possible, just like with arrays:

```js
let {resolution, ...rest} = options;
console.log(rest);  // {difficulty: "insanity", subtitles: true}
```

There's a small catch when using predeclared variables:

```js
let resolution, difficulty, subtitles;
({resolution, difficulty, subtitles} = options)
```

This assignment won't work without the parentheses. The reason for this is that without the declaration statement ("let" in this case) present in the expression, the JavaScript engine treats the contents of the curly brackets as a code block.

Destructuring can be used along with `Object.entries()` to loop over keys and values of an object:

```js
let user = {
    name: "John",
    age: 30
};

for (let [key, value] of Object.entries(user)) {
    console.log(`${key}: ${value}`);  // 'name: John', 'age: 30'
}
```

The same is true for a map:

```js
let user = new Map();

user.set("name", "John");
user.set("age", "30");

for (let [key, value] of user) {
    console.log(`${key}: ${value}`);  // 'name: John', 'age: 30'
}
```

### Nested destructuring

If an object or array contain nested objects or arrays, we can use more complex patterns to extract the deeper layer:

```js
let options = {
    size: {
        width: 100,
        height: 200
    },
    items: ["Cake", "Donut"],
    extra: true
};

let {
    size: {
        width,
        height
    },
    items: [item1, item2],
    title = "Menu"  // not present in the object (default value provided)
} = options;

console.log(title);  // Menu
console.log(width);  // 100
console.log(height);  // 200
console.log(item1);  // Cake
console.log(item2);  // Donut
```

### Smart function parameters

We can define function parameters as an object. That way, for functions with multiple optional parameters, we can can pass object arguments that only hold properties which are of interest to us at the time, and safely ignore the rest:

```js
let gameSettings = ({resolution='1920x1080', difficulty='normal', subtitles=false}) => {
    console.log(`Game settings are: res: ${resolution}, df: ${difficulty}, subs: ${subtitles}`)
};

let myGameSettings = {
    difficulty: "hardcore",
    subtitles: true
};

gameSettings(myGameSettings);  // difficulty and subtitles are changed, while resolution remains default
```

Note that this structure requires the `gameSettings()` function to have an argument. To still be able to call it without providing any arguments, set an empty object as default:

```js
let gameSettings = ({res='1920x1080', df='normal', subs=false} = {}) => {
    console.log(`Game settings are: res: ${res}, df: ${df}, subs: ${subs}`)
};
```

## Exercises

### Destructuring assignment

Given the following object...:

```js
let user = {
    name: "John",
    years: 30
};
```

...write a destructuring assignment that takes the properties `name` and `years` and saves them into variables `name`, `age`, and which also takes an `isAdmin` property and saves it into a variable `isAdmin` (which defaults to `false` if such property doesn't exist).

```js
let {name, years, isAdmin=false} = user;
```

### Top salary

Given the following object...:

```js
let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};
```

...create a function `topSalary(salaries)` that returns the name of the top paid person, or `null` if salaries is empty. If there are multiple top-paid persons, return any of them. Use `Object.entries` and destructuring to iterate over key-value pairs.

```js
let topSalary = (salaries) => {
    let currentHighestSalary = 0;
    let topPaidPerson = null;
    for (let [name, salary] of Object.entries(salaries)) {
        if (salary > currentHighestSalary) {
            currentHighestSalary = salary;
            topPaidPerson = name;
        }
    }
    return topPaidPerson;
};
```
