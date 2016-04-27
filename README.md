# tiny-formative

TODO: Major reorg, simplification and clarification of app pub/sub
code

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
Time   : Tue Apr 26 2016 23:25:02 GMT-0700 (PDT)
Method : average: 4174/min 102ms
         clear: 11/min 46ms
         draw: 4162/min 102ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:25:07 GMT-0700 (PDT)
Method : average: 743/min 2ms
         draw: 743/min 2ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:25:12 GMT-0700 (PDT)
Method : average: 11148/min 192ms
         draw: 11148/min 192ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:25:17 GMT-0700 (PDT)
Method : average: 10639/min 112ms
         draw: 10639/min 112ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:25:22 GMT-0700 (PDT)
Method : average: 19588/min 2276ms
         draw: 19588/min 2276ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:25:27 GMT-0700 (PDT)
Method : average: 14064/min 1398ms
         draw: 14064/min 1398ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:25:32 GMT-0700 (PDT)
Method : average: 18888/min 968ms
         draw: 18888/min 968ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:25:37 GMT-0700 (PDT)
Method : average: 17784/min 155ms
         draw: 17784/min 155ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:25:42 GMT-0700 (PDT)
Method : average: 8832/min 1320ms
         draw: 8832/min 1320ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:25:47 GMT-0700 (PDT)
Method : average: 18948/min 5221ms
         draw: 18948/min 5221ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:25:52 GMT-0700 (PDT)
Method : average: 4787/min 7731ms
         draw: 4787/min 7731ms
```
