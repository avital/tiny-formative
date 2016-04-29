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

```sh
cd app
npm install # This will print gyp errors. That's OK.
meteor
```

Simulate a student or a few by loading
[http://localhost:3000](http://localhost:3000) in your browser.

Simulate the teacher by loading
[http://localhost:3000/teacher](http://localhost:3000/teacher) in your
browser.

To clear all drawings, open a browser console and run
`Meteor.call("clear")`. Then you'll have to reload your browser.

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
```sh
cd load-test
npm install node
index.js
```

#### On Galaxy

XXX

## Latest load test results when running locally

Run on April 26, 2016 at 11pm Pacific Time.

```
Running load test with 400 concurrent students

--------------------------------------------------
Time   : Thu Apr 28 2016 21:09:01 GMT-0700 (PDT)
Method : average: 4570/min 22ms
         draw: 4558/min 18ms
         clear: 11/min 1259ms
--------------------------------------------------
Time   : Thu Apr 28 2016 21:09:06 GMT-0700 (PDT)
Method : average: 239/min 2ms
         draw: 239/min 2ms
--------------------------------------------------
Time   : Thu Apr 28 2016 21:09:11 GMT-0700 (PDT)
Method : average: 11865/min 37ms
         draw: 11865/min 37ms
--------------------------------------------------
Time   : Thu Apr 28 2016 21:09:16 GMT-0700 (PDT)
Method : average: 11949/min 309ms
         draw: 11949/min 309ms
--------------------------------------------------
Time   : Thu Apr 28 2016 21:09:21 GMT-0700 (PDT)
Method : average: 22812/min 980ms
         draw: 22812/min 980ms
--------------------------------------------------
Time   : Thu Apr 28 2016 21:09:26 GMT-0700 (PDT)
Method : average: 15144/min 88ms
         draw: 15144/min 88ms
--------------------------------------------------
Time   : Thu Apr 28 2016 21:09:31 GMT-0700 (PDT)
Method : average: 12117/min 134ms
         draw: 12117/min 134ms
--------------------------------------------------
Time   : Thu Apr 28 2016 21:09:36 GMT-0700 (PDT)
Method : average: 25092/min 155ms
         draw: 25092/min 155ms
--------------------------------------------------
Time   : Thu Apr 28 2016 21:09:41 GMT-0700 (PDT)
Method : average: 24391/min 341ms
         draw: 24391/min 341ms
--------------------------------------------------
Time   : Thu Apr 28 2016 21:09:46 GMT-0700 (PDT)
Method : average: 1415/min 2ms
         draw: 1415/min 2ms
```
