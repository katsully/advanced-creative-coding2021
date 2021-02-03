# Class 2 - Functions, Arrays, and Objects

### Functions

A **function** is a set of statements that perform a task.

Optionally, functions can have parameters. These parameters must be used when calling the function.

```javascript
writeSomeText();
writeThisText("I want to write this sentence");
writeThisTextHere("I want to write this sentence and have it appear at coordinates 100, 65", 100, 65);

function writeSomeText(){
	text("I'm printing some text", 10, 10);
}

function writeThisText(words){
    text(words, 10, 10);
}

function writeThisTextHere(words, x, y){
    text(words, x, y);
}
```



### Arrays

How do arrays works?
Let's say you have an array called *data*.

```
data =  []
data[0] = 698
data [1] = 743
data[2] = 84
```

This creates a structure where at index 0 the value will be 698, index 1 the value will be 743, etc.

| 0    | 1    | 2    |
| ---- | ---- | ---- |
| 698  | 743  | 84   |



### Objects

What is an object?
An **object** is a collection of properties, a property is an association between a name (or key) and a value.

Example:

```
var kat = {
   first: "kat",
   last: "sullivan"
}
```

This is called an object literal - it's more of a container of data.

Another way to create objects is with the constructor function

```javascript
class Person{
    constructor(firstName, lastName) {
        this.first = firstName;
        this.last = lastName;
    }
}

var kat = new Person("kat", "sullivan");
var prez = new Person("joe", "biden");
```

This is a more dynamic way of creating objects because we can create many objects, each with different values for the first and last property.

