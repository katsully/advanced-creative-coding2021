# Class 2 - Functions, Arrays, and Objects

### Functions

A **function** is a set of statements that perform a task or calculate a value. It is a block of code that can be executed when "called" for. To use a function, you must define it.

A function definition (also called function declaration or function statement) consists of the following:

	1. the name function
 	2. (optional) A list of parameters, enclosed in parentheses.
 	3. The code statements that define the function, enclosed in curly brackets { }

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



### Objects & Classes

What is an object?
An **object** is a collection of properties, a property is an association between a name (or key) and a value. 

Example:

```
var person_kat = {
   first: "kat",
   last: "sullivan"
}
```

In this example person_kat.first = "kat" and person_kat.last = "sullivan"

This is called an object literal - it's more of a container of data.

Another way to create objects is with the constructor function inside of a class. A class is a template for creating an object. It can also contain key value pairs.

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

In this example, Person is the class, kat and prez are the objects.

This is a more dynamic way of creating objects because we can create many objects, each with different values for the first and last property.

A class can also contain function definitions which can be called by objects created from that class.

```javascript
class Person{
    constructor(firstName, lastName) {
        this.first = firstName;
        this.last = lastName;
    }
    
    fullname() {
        console.log(this.first + " " this.last);
    }
}

var kat = new Person("kat", "sullivan");
var prez = new Person("joe", "biden");

kat.fullname();
prez.fullname()
```

In this example, the code will print out 

"kat sullivan"

"joe biden"

Note whenever we call a function we need the (), if we don't include the (), it will return the function definition rather than execute the function.