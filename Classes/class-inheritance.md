## Class inheritance

Class inheritance is a way for one class to extend another.

```js
class Animal {
    constructor(name) {
        this.name = name;
        this.speed = 0;
    }
}

class Rabbit extends Animal {
    run(speed) {
        this.speed = speed;
    }
}

let rabbit = new Rabbit("Pinky");
rabbit.run(60);
```

Internally, the `extends` keyword uses the prototype mechanics. It sets `Rabbit.prototype.__proto__` to `Animal.prototype`, so if a method is not found in `Rabbit.prototype`, it is then taken from `Animal.prototype`.

Any expression is allowed after `extends`. This means we may e.g. create a class factory function, and then have other classes extended by the result of that function.

## Overriding methods

By default, all methods not specified in the child class are taken from the parent class. However, if we specify a method on a child class that's named identically as a method in the parent class, it will be overridden.

If we don't want to replace the parent method entirely, but tweak its functionality instead, we can use the `super` keyword. For example, we can call the parent method by invoking `super.method()` and then do something else.

Arrow functions have no `super`. If `super` is accessed within the body of an arrow function in a method call, it will reference the parent class.

## Overriding constructors

If a class extends another class and has no `constructor`, the following "empty" constructor is generated:

```js
class Rabbit extends Animal {
    constructor(...args) {
        super(...args);
    }
}
```

If we do create a distinct constructor in the child class, **it must call `super()`**, and it must do so before it is able to use `this`. A child class constructor (derived constructor, as labelled in a special internal property `[[ConstructorKind]]: "derived"`) behaves differently with `new` than regular constructors.

When a regular function is executed with `new`, an empty object is created and assigned to `this`. But when a derived constructor runs, it doesn't happen. The parent constructor is expected to do it instead. This is why a derived constructor must call `super()` in order to execute the parent constructor. Otherwise, the object for `this` will not be created.

Not only methods, but also class fields can be overridden. However, the parent constructor always uses its own field value, not the overridden one. Class fields are initialized before the constructor in the base class, and after `super()` for the derived class. This difference between fields and methods is specific to Javascript.

Methods remember their class/object in the internal `[[HomeObject]]` property, thanks to which `super` is able to resolve parent methods. For this reason, it is not safe to copy a method that uses `super` from one object to another.

## Extending built-in classes

Built-in classes such as `Array`, `Map` etc. are also extensible. When an instance of a class that extends a built-in class calls a built-in method inherited from the parent class (such as `filter`, `map`, and so on), an object of the child class is returned.

Moreover, that behaviour can be customized using a special static getter `Symbol.species`. If that getter is defined, it should return a constructor that JS will use internally to create new entities using built-in methods.

## Class checking

The `instanceof` operator allows for checking whether the object belongs to a certain class:

```js
let arr = [1, 2, 3];
console.log(arr instanceof Array);  // true
console.log(arr instanceof Object);  // true
```

In the example above, since `Array` inherits from `Object`, both class checking statements are true.

Normally, `instanceof` examines the prototype chain when performing the check. However, it's also possible to set up custom logic using the static method `Symbol.hasInstance(obj)`. Most classes don't have it, but if it is defined, it will be used for the check instead (it should return `true` or `false`).

Another way to check an object's class is using `Object.prototype.toString` in the context of the target object:

```js
const prototypeToString = Object.prototype.toString;

console.log(prototypeToString.call(1));  // [object Number]
console.log(prototypeToString.call([]));  // [object Array]
console.log(prototypeToString.call(null));  // [object Null]
```

The behaviour of an object's `toString` can be modified using the property `Symbol.toStringTag`:

```js
let user = {
    [Symbol.toStringTag]: "User"
};

console.log(Object.prototype.toString.call(user));  // [object User]
```

`Object.prototype.toString` essentially functions as a more advanced `typeof`.

## Mixins

Javascript does not allow for multiple inheritance. An object can only have one `[[Prototype]]`, and a class can only extend one other class.

To get around that, mixins can be used. A **mixin** is a class containing methods that can be used by other classes without a need to inherit from it. It provides methods that implement a certain behaviour, which can be added to other classes.

Methods can be added to classes using `Object.assign()`. Mixins may end up overwriting existing methods on classes they're used with, so it's a good idea to pay close attention to method naming on a mixin to minimize the chances of that happening.
