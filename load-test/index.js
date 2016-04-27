var meteorDown = require('@avital/meteor-down');
var data = require('./sample-data');

// Modify this to run the load test with more or fewer concurrent
// students
var concurrentStudents = 400;

var isFirstRun = true;
var numOutstandingDrawings = concurrentStudents;

console.log("\nRunning load test with " +
            concurrentStudents + " concurrent students\n");

meteorDown.init(function (Meteor) {
  if (isFirstRun) {
    isFirstRun = false;
    Meteor.call("clear");
  }

  var fakeUserId = Math.random().toString();
  data.forEach(function(invocation, index) {
    setTimeout(function() {
      Meteor.call("draw", fakeUserId, invocation.path.segments, function() {
        if (index === data.length-1) {
          if (--numOutstandingDrawings === 0) {
            // Let meteor-down print the last summary within 5
            // seconds, then quit.
            setTimeout(function() {
              process.exit(0);
            }, 5000);
          }
        }
      });
    }, invocation.time + (Math.random() * 3000));
  });
});

meteorDown.run({
  concurrency: concurrentStudents,
  url: "http://localhost:3000"
});
