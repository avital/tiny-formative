# tiny-formative

This is a small Meteor app for students and a single teacher. Each
student draws a single diagram, and the teacher sees the diagrams that
all of the students are drawing. The drawings update live while the
students are drawing them, and are persisted to a Mongo database.

We are using this app to compare the performance of different data
models, protocols and persistence models.

The Meteor app itself is located in the `app/` subdirectory.

The load test is located in the `load-test/` subdirectory.

## Running the app

```js
cd app
npm install # This will print gyp errors. That\'s OK.
meteor
```

Simulate a student or a few by loading
[http://localhost:3000](http://localhost:3000) in your browser.

Simulate the teacher by loading
[http://localhost:3000/teacher](http://localhost:3000/teacher) in your
browser.

To clear all drawings, open a browser console and run
`Meteor.call("clear")`.

## Load testing

### Creating a load test based on particular student drawing behavior

XXX

### Running a load test

TODO: Simplify by removing the need to have a browser tab open as a
teacher.

TODO: Create a system that runs a load test with 50, 100, 200, 400,
800 concurrent students and prints average method latency for each.

#### Locally

Run the app locally and point your browser to
[http://localhost:3000/teacher](http://localhost:3000/teacher). (Note
that if you clear drawings you have to reload the page)

Then, run the load test:
```js
cd load-test
npm install node
index.js
```

#### On Galaxy

XXX


