# Class 4 - Functions, Arrays, and Objects

### HTML

Hyper Text Markup Language tags represent elements which are the building blocks of your webpage.

### DOM

Document Object Model is the HTML that gets parsed to create your webpage.

The DOM is not a programming language, but without it, p5 does not have any model or notion of the components on the page (canvas, buttons, sliders, etc). Every element in a document - the document as a whole, the head, the p5 canvas, buttons, are part of the Document Object Model for that document, so they can be access and manipulated using the DOM and a scripting language like p5.

### Functions and Callbacks

I've always described functions as verbs and objects as nouns and treated them as separate entities, BUT, in JavaScript, functions can also be objects.

woah

This means functions can be stored in variables, passed as arguments to functions, created with a function, and returned from a function.

Callback functions are a technique that is part of functional programming. JavaScript is not classified as a function program, but it does use callback functions.

Let's look at an example

```javascript
var button = select('#button');	// get the HTML element with the id 'buttom'
button.mousePressed(doSomething);	// doSomething is the callback function

// doSomething is a function we defined that will get called whenever someone presses the button
function doSomething() {
	// some code
}
```

When we pass a callback as an argument to another function, we are only passing the callback function definition. We aren't executing the callback function inside the function. So it's `button.mousePressed(doSomething)` NOT `button.mousePressed(doSomething())`

Why?

We are not executing the function in the parameter. Which means the function is not executed immediately (it may seem immediate to you), it is "called back" at some point in the mousePressed function using the doSomething function definition.