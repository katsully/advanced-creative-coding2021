# Class 7 - APIs	

### API

**A**pplication **P**rogram **I**nterface can be used to interact with software applications, such as Facebook, the New York Times, Youtube, Google Maps, etc. With APIs you can retrieve data, send messages to the client (ie Tweet from a Twitterbot), & so much more! APIs are basically a set of rules that govern how one application talks to another (ie how your P5 sketch asks Twitter for data or how Yelp uses Google maps to show where your favorite restaurant is).

But proceed with caution... Just because a company has an API today, doesn't mean it will be available tomorrow. For example, a major component of my graduate final was based on gathering public data from Facebook's API, however on the morning of my final, Facebook changed their API and you could no longer query public data.

### Query Strings

Let's look at the following url: https://www.example.com/widgets?color=blue&sort=newest

Look at everything to the right of the ?, those are referred to as query strings. In this case we have two key:value pairs --> color: blue and sort:newest. Query strings are extremely important when talking about APIs.