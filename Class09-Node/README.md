# Backend Programming

So what happens when we go to a website?

A client (ie your computer or phone) makes a request to a server (a different computer or computer program)

​	When you go to google.com, your computer makes a request to the Google server

**Hyper Text Transfer Protocol** is the language that clients and servers use to communicate to one another.



### Frontend vs Backend

JavaScript/HTML/CSS is front-end programming

- Frontend programming is mostly aesthetics and functionality
- Does not persist data
  - If you enter data in a p5 sketch, and refresh the page, it goes away

Node.js is backend programming

- Persists data
- Interfaces with a database
- Necessary to interact with APIs that use authentication, ie Twitter



### Node.js

In simplest form, Node.js allows you to run JavaScript files without a text editor package like BrowserSync or Live Server

​	Can run JavaScript directly from the command line

Node is a JavaScript framework for writing custom servers



### NPM

With p5, there are different libraries, the sound library, the touch library, etc

p5 have its own is a library

Node also has libraries, called packages. To handle the packages, we use the Node Package Manager.

- NPM is how we handle installing and managing these packages
- We are going to use the Twit package for our Twitter bot



### Why do I need this?

Twitter API is different from the APIs in the last class because it requires OAuth

​	You need keys, tokens, and secrets...oh my!

​    Cannot be done with just the browser....you need a server

​    The server talks to Twitter and gives Twitter your tokens