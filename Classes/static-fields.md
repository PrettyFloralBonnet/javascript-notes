## Static methods and properties

Methods can be assigned to the class instead of the the class instance:

```js
class User {
    static staticMethod() {
        console.log(this === User);  // true
    }
}
```

Static methods are usually used to implement functions that belong to the class itself, rather than any particular instance of it.

Static methods can be used to create a factory method:

```js
class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }

    static createTodaysArticle() {
        return new this("Today's title", new Date());
    }
}
```

Static methods are not available for object instances.

Static properties are also possible and similarly defined:

```js
class Ship {
    static commander = "John Shepard";
}
```

For both static methods and properties, declaring them is the equivalent of taking a class object itself and assigning a value to its attribute (`MyClass.property = ..., MyClass.method = function() { ... }`).

Static properties and methods are automatically inherited, just like regular ones.
