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

Run on April 26, 2016 at 11pm Pacific Time. (trimmed, it pretty much
just hangs)

```
Running load test with 400 concurrent students

--------------------------------------------------
Time   : Tue Apr 26 2016 23:32:30 GMT-0700 (PDT)
Method : average: 4488/min 157ms
         clear: 12/min 9ms
         draw: 4476/min 157ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:32:35 GMT-0700 (PDT)
Method : average: 371/min 11ms
         draw: 371/min 11ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:32:40 GMT-0700 (PDT)
Method : average: 1595/min 1304ms
         draw: 1595/min 1304ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:32:45 GMT-0700 (PDT)
Method : average: 5052/min 5303ms
         draw: 5052/min 5303ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:32:50 GMT-0700 (PDT)
--------------------------------------------------
Time   : Tue Apr 26 2016 23:32:55 GMT-0700 (PDT)
Method : average: 9296/min 14167ms
         draw: 9296/min 14167ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:33:00 GMT-0700 (PDT)
--------------------------------------------------
Time   : Tue Apr 26 2016 23:33:05 GMT-0700 (PDT)
--------------------------------------------------
Time   : Tue Apr 26 2016 23:33:10 GMT-0700 (PDT)
--------------------------------------------------
Time   : Tue Apr 26 2016 23:33:15 GMT-0700 (PDT)
--------------------------------------------------
Time   : Tue Apr 26 2016 23:33:20 GMT-0700 (PDT)
--------------------------------------------------
Time   : Tue Apr 26 2016 23:33:25 GMT-0700 (PDT)
--------------------------------------------------
Time   : Tue Apr 26 2016 23:33:30 GMT-0700 (PDT)
--------------------------------------------------
Time   : Tue Apr 26 2016 23:33:35 GMT-0700 (PDT)
--------------------------------------------------
Time   : Tue Apr 26 2016 23:33:40 GMT-0700 (PDT)
--------------------------------------------------
Time   : Tue Apr 26 2016 23:33:45 GMT-0700 (PDT)
--------------------------------------------------
Time   : Tue Apr 26 2016 23:33:50 GMT-0700 (PDT)
Method : average: 13018/min 62557ms
         draw: 13018/min 62557ms
--------------------------------------------------
Time   : Tue Apr 26 2016 23:33:55 GMT-0700 (PDT)
--------------------------------------------------
Time   : Tue Apr 26 2016 23:34:00 GMT-0700 (PDT)
```
