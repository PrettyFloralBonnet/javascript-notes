# Date and time

The built-in object `Date` stores the date, time and provides methods for managing them.

### Date creation

```js
let now = new Date();
console.log(now);  // current datetime
```

This constructor accepts an integer argument which represents how many milliseconds passed since January 1st, 1970 UTC+0. That integer is called a **timestamp**.

```js
console.log(new Date(0));  // 01.01.1970 UTC+0
console.log(new Date(24 * 3600 * 1000));  // 02.01.1970 UTC+0
```

Dates before January 1st, 1970 have negative timestamps, e.g.:

```js
console.log(new Date (-24 * 3600 * 1000));  // 31.12.1969 UTC+0
```

Dates can be also parsed from a string argument (adjusted to the timezone the code is run in)...:

```js
let date = new Date('2020-05-04');
```

...or from more granular components:

```js
let composedDate = new Date(2012, 0, 1, 0, 0, 0, 0);  // 1 Jan 2012, 00:00:00
let composedDate2 = new Date(2012, 0)  // exactly the same as above, the omitted args are provided by default
```

### Accessing date components

The following methods allow for accessing date components:

```js
Date.getFullYear()  // get the year (4 digits)
Date.getMonth()  // get the month (from 0 (January) to 11 (December))
Date.getDate()  // get the day of the month (from 1 to 31)
Date.getDay()  // get the day of the week (from 0 (Sunday) to 6 (Saturday))
Date.getHours()  // also: getMinutes(), getSeconds(), getMilliseconds() - get the relevant time components
```

All of these methods return the components relative to the local time zone. They also have their UTC counterparts: `getUTCFullYear()`, `getUTCMonth()`, `getUTCDay()` etc.

```js
let date = new Date();  // current date
console.log(date.getHours());  // the hour in the local time zone
console.log(date.getUTCHours());  // the hour in UTC+0
```

There are also two methods which do not have the UTC variant:

```js
Date.getTime()  // returns timestamp for the date
Date.getTimezoneOffset()  // returns the difference between UTC and the local time zone (in minutes)
```

### Setting date components

The following methods allow for setting date components:

```js
Date.setFullYear(year, month, date);
Date.setMonth(month, date);
Date.setDate(date);
Date.setHours(hour, min, sec, ms);
Date.setMintes(min, sec, ms);
Date.setSeconds(sec, ms);
Date.setMilliseconds(ms);
Date.setTime(ms)  // sets the entire date using milliseconds since 01.01.1970 UTC+0
```

Each of those except for `setTime()` has a UTC variant. Moreover, for each of them only the first paramenter is obligatory.

### Date autocorrection

If we set values that are out of range, they will be adjusted automatically:

```js
let date = new Date(2014, 0, 32)  // February 1st, 2014
```

This means we can e.g. increase the date "February 28th" by 2 days, and it will auto-adjust:

```js
let date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);  // March 1st, 2016 (2016 was a leap year)
```

### Date to number conversion

When a `Date` object is converted to a number, it becomes a timestamp (same as `date.getTime()`):

```js
let date = new Date();
console.log(+date);  // unix timestamp
```

This means dates can be subtracted, and the result is the difference in milliseconds.

### `Date.now()`

This method also returns the current timestamp. Its result is identical to `new Date().getTime()`, but it doesn't actually create a `Date` object (which is faster and doesn't involve garbage collection).

### Benchmarking

Say we want to measure the time a given function takes:

```js
let dateDiffSubtract = (date1, date2) => {
    return date2 - date1;
}

let dateDiffGetTime = (date1, date2) => {
    return date2.getTime() - date1.getTime();
}

let benchmark = (func) => {
    let date1 = new Date(0);
    let date2 = new Date();

    let start = Date.now();
    for (let i = 0; i < 100000; i++) func(date1, date2);
    return Date.now() - start;
}

console.log(`Function ${dateDiffSubtract.name} took ${+benchmark(dateDiffSubtract)} ms.`);
console.log(`Function ${dateDiffGetTime.name} took ${+benchmark(dateDiffGetTime)} ms.`);
```

Here, it turns out using `getTime()` is much faster, because there is no type conversion.

But what if the CPU were doing something else when benchmarking these? That would influence the outcome. For more reliable benchmarking, the benchmark suite should be rerun multiple times, e.g.:

```js
let subtractTotalTime = 0;
let getTimeTotalTime = 0;

for (let i = 0; i < 10; i++) {
    subtractTotalTime += benchmark(dateDiffSubtract);
    getTimeTotalTime += benchmark(dateDiffGetTime);
}

console.log(`Function ${dateDiffSubtract.name} took ${subtractTotalTime} ms to run 10 times.`);
console.log(`Function ${dateDiffGetTime.name} took ${getTimeTotalTime} ms to run 10 times.`);
```

Moreover, modern JavaScript engines are capable of applying optimizations to code that executes multiple times. That means initial runtimes may not be as well optimized as later ones. Therefore we may even want to add a "warm up" run:

```js
// warm up
benchmark(dateDiffSubtract);
benchmark(dateDiffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
    subtractTotalTime += benchmark(dateDiffSubtract);
    getTimeTotalTime += benchmark(dateDiffGetTime);
}
```

### Parsing a date from string

The `Date.parse(str)` method can parse a date from a string. The string format should be: `YYYY-MM-DDTHH:mm:ss.sssZ`, where:

* `YYYY-MM-DD` is year-month-day
* The `T` character is used as a delimiter
* `HH:mm:ss.sss` is hours:minutes:seconds:milliseconds
* The `Z` character is the time zone (in the format: `+-hh:mm`); a single `Z` means `UTC+0`

The call to `Date.parse(str)` parses the string in the provided format and returns the timestamp. If the format is invalid, it returns `NaN`.

```js
let timestamp = Date.parse('2024-01-26T12:01:30.374-07:00');
console.log(timestamp)  // 1706295690374;
```

It's also possible to instantly create a new `Date` object from a timestamp:

```js
let date = new Date(Date.parse('2024-01-26T12:01:30.374-07:00'));
```

### More precise time measurements

Sometimes precise time measurements (e.g. microseconds) are needed. JavaScript itself does not provide a way to measure time in microseconds, but most environments do (e.g. browsers offer a `performance.now()` method that returns the number of milliseconds that passed since the page started loading, down to a microsecond precision (3 digits after the dot), Node.js has a microtime module etc.).

## Exercises

### Create a date

Create a Date object for the date: Feb 20, 2012, 3:12 am (local time).

```js
let date = new Date(2012, 1, 20, 3, 12);
console.log(date);
```

### Show the day of the week

Write a function `getWeekDay(date)` that returns the day of the week in the format: 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'.

```js
let getWeekDay = (date) => {
    const dayNames = {
        0: 'SUN',
        1: 'MON',
        2: 'TUE',
        3: 'WED',
        4: 'THU',
        5: 'FRI',
        6: 'SAT'
    };

    if (date instanceof Date) {
        return dayNames[date.getDay()];
    } else {
        try {
            return dayNames[new Date(Date.parse(date)).getDay()]
        }
        catch (e) {
            if (e instanceof TypeError) {
                console.log('Invalid argument.')
            }
        }
    }
}

let date = new Date(2012, 0, 3);
getWeekDay(date);
```

### "European" weekday

Write a function `getLocalDay(date)` that returns the day of the week for date in the format where the first day of the week is Monday (since Sunday is the default for some parts of the world).

```js
let getLocalDay = (date) => {
    let defaultDay = date.getDay();
    if (defaultDay == 0) {
        return 6;
    } else {
        return defaultDay - 1;
    }
}
```

### What day was it

Create a function `getDateAgo(date, days)` that returns the day of the month that occurred `days` ago after the `date` (e.g.: on the 20th day of the month, `getDateAgo(newDate(), 1)` should return 19, for the 19th). The function should work for `days` equal to 365 and more, and should not modify the `date` argument.

```js
let getDateAgo = (date, days) => {
    return new Date(date - (days * 24 * 3600 * 1000)).getDate();
}
```

### Last day of the month

Write a function `getLastDayOfMonth(year, month)` that returns the last day of the given month (0-11) in the given year (in the four-digit format).

```js
let getLastDayOfMonth = (year, month) => {
    // we basically grab the day before the first day of the month
    // the date will autocorrect
    return new Date(year, month + 1, 0).getDate()
}
```

### Seconds today

Write a function `getSecondsToday()` that returns the number of seconds from the beginning of today.

```js
let getSecondsToday = () => {
    let now = new Date();
    let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let diff = (now - startOfToday) / 1000;  // assumes the precalculated value of "now" is accurate enough
    return Math.round(diff);
}
```

### Seconds until tomorrow

Write a function `getSecondsTillTomorrow()` that returns the number of seconds remaining till tomorrow.

```js
let getSecondsTillTomorrow = () => {
    let now = new Date();
    let startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    let diff = (startOfTomorrow - now) / 1000;
    return Math.round(diff);
}
```

### Format date

Create a function `formatDate(date)` that returns date in the following format:

* if less than 1 second had passed since date: "right now"
* if at least 1 second, but less than 1 minute passed: "`n` seconds ago"
* if at least 1 minute, but less than 1 hour: "`n` hours ago"
* if at least 1 hour had passed: full date in the format "`DD.MM.YY HH:mm`" (all in 2 digits)

```js
let _ensureDoubleDigitFormat = (dateComponent) => {
    if (dateComponent < 10) dateComponent = '0' + dateComponent;
    return dateComponent;
}

let _parseDate = (date) => {
    let day = _ensureDoubleDigitFormat(date.getDate());
    let month = _ensureDoubleDigitFormat(date.getMonth() + 1);
    let year = String(date.getFullYear()).slice(-2);
    let hours = _ensureDoubleDigitFormat(date.getHours());
    let minutes = _ensureDoubleDigitFormat(date.getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`
}

let formatDate = (date) => {
    let diff = new Date() - date;
    if (diff < 1000) return 'right now';
    else if (diff < 60 * 1000) return `${diff / 1000} seconds ago`;
    else if (diff < 3600 * 1000) return `${diff / 60000} minutes ago`;
    else return _parseDate(date);
}
```
