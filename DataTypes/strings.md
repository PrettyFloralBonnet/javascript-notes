## Strings

In JS, textual data is stored as strings. There is no separate data type for a single character. Strings in JavaScript are UTF-16 encoded (regardless of the page encoding).

Strings can be enclosed in single quotes ('), double quotes (") or backticks (``). Backticks are special in that they allow to embed any expression (including function calls) into a string, and they also allow strings to span multiple lines.

Strings are immutable (it is impossible to change a character in a string).

## Special characters

```
\n          New line
\r          Carriage return
\', \", \` 	Quotes
\\ 	        Backslash
\t 	        Tab
\b, \f, \v 	Backspace, Form Feed, Vertical Tab (leftovers, not used nowadays)
\x7A        Unicode character with a hexadecimal unicode (the provided example, 7A, is "z")
\u00A9 	    A unicode symbol with the hex code XXXX (4 hex digits exactly) in UTF-16 encoding (the provided example, 00A9, is "©")
\u{1F60D}   (1 to 6 hex characters) unicode symbol with the given UTF-32 encoding
            (some rare characters are encoded with two unicode symbols, taking 4 bytes)
```

## Length

In JavaScript, `str.length` is a property (not a function).

## Accessing characters

To get a character at a specific position, square bracket notation `[]` or the method `str.at(pos)` can be used:

```js
let str = 'Hello';
console.log(str[0] );  // H
console.log(str.at(0))  // H
```

With `str.at(pos)`, negative indices can be provided, and the position will be counted from the end of the string:

```js
let str = 'Hello';
console.log(str.at(-1));  // o
```

We can also iterate over string characters with `for..of`:

```js
for (let char of "Hello") {
    console.log(char);  // H,e,l,l,o
}
```

## Changing the case

```js
console.log('Interface'.toUpperCase()); // INTERFACE
console.log('Interface'.toLowerCase()); // interface
```

## Searching for a substring

There are multiple ways of looking for a substring within a string.

### indexOf

The method `str.indexOf(substring, position)` looks for the provided `substring` starting from the provided `position`, and returns the position where the match was found, or `-1` if no match was found.

```js
let str = 'Widget with id';

console.log(str.indexOf('Widget'));  // 0, because 'Widget' is found at the beginning
console.log(str.indexOf('widget'));  // -1, not found (the search is case-sensitive)
console.log(str.indexOf("id"));  // 1, "id" is found at the position 1 (W*id*get with id)
console.log(str.indexOf('id', 2))  // 12 (starting the search at index 2)
```

To find all substring occurrences, `indexOf` can be run in a loop:

```js
let str = 'As sly as a fox, as strong as an ox';
let target = 'as';
let pos = 0;

while (true) {
    let foundPos = str.indexOf(target, pos);
    if (foundPos == -1) break;
    console.log(`Found target "${target}" at position: ${foundPos}`);
    pos = foundPos + 1
}
```

Shorter, but less readable version of the above:

```js
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
    console.log(pos);
}
```

There is also a similar method, `str.lastIndexOf(substring, position)`, which searches the string from the end (and therefore lists substring occurrences in reverse order).

### includes, startsWith, endsWith

```js
str.includes(substr, pos)  // returns true or false depending on whether str contains substr
str.startsWith(substr)  // returns true or false depending on whether str starts with substr
str.endsWith(substr)  // returns true or false depending on whether str ends with substr
```

## Retrieving a substring

There are 3 methods in JS capable of getting a substring: `str.substring`, `str.substr` and `str.slice`.

The method `str.slice(start [, end])` returns a section of str between `start` (inclusive) and `end` (exclusive). If `end` is not provided, the slice goes until the end of the string.

```js
let str = "Otra cosa mariposa";
str.slice(0, 6); // Otra c
str.slice(0, 1);  // O
```

The method `str.substring(start [, end])` returns a section of the string between `start` and `end`, almost the same as `str.slice`, except it allows `start` to be greater than `end`. Unlike `str.slice`, negative arguments are not supported (and they get treated like `0`).

The method `str.substr(start [, length])` returns a section of the string starting from `start` (may be negative), with the provided `length`.

## Other string methods

```js
str.trim()  // removes whitespace from the beginning and end of the string
str.repeat(n)  // repeats the string n times
```

## Exercises

### Capitalize the first character

Write a function `capitalizeFirst(str)` that returns `str` with the first character in uppercase.

```js
let capitalizeFirst = (str) => {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}
```

### Check for spam

Write a function `checkSpam(str)` that returns `true` if `str` contains "viagra" or "XXX". Otherwise, the function must return `false`. The function must be case-insensitive.

```js
let checkSpam = (str) => {
    if (str.toLowerCase().includes('viagra') || str.toLowerCase().includes('xxx')) {
        return true;
    }
    return false;
}
```

### Truncate the text

Create a function `truncate(str, maxLength)` that checks the length of `str`. If the length of `str` exceeds `maxLength`, it replaces the end of `str` with the ellipsis character "…", to make its length equal to `maxLength`. Then it returns the string (truncated, if necessary).

```js
let truncate = (str, maxLength = str.length) => {
    if (str.length > +maxLength) {
        let truncatedStr = str.slice(0, +maxLength) + "...";
        return truncatedStr;
    }
    return str;
}
```

### Extract numeric value

Given a price represented by the string "$120", create a function `extractCurrencyValue(str)` that would extract the numeric value from such string, and return it.

```js
let extractCurrencyValue = (str) => {
    return +str.slice(1);
}
```
