import Fiber from "fibers";

// For students, just send their segments
Meteor.publish("student", function(fakeUserId) {
  return Segments.find({fakeUserId});
});

// maps _id -> segment document
allSegments = {};

Notifications.addListener('clearSegments', () => {
  allSegments = {};
});

// Make sure to add the event listener before fetching from the
// database; Otherwise we might miss notifications.
Notifications.addListener('newSegment', segment => {
  allSegments[segment._id] = segment;
});
Segments.find().forEach(segment => {
  allSegments[segment._id] = segment;
});

Meteor.publish("teacher", function() {
  var start = new Date;
  var pub = this;

  Meteor._noYieldsAllowed(() => {
    for (let segmentId in allSegments) {
      const segment = allSegments[segmentId];
      pub._session.socket.send(
        JSON.stringify(
          {msg: "added", collection: "segments", id: segment._id, fields: segment}));
    }

    function newSegment(segment) {
      pub._session.socket.send(
        JSON.stringify(
          {msg: "added", collection: "segments", id: segment._id, fields: segment}));
    };
    Notifications.addListener('newSegment', newSegment);
    pub.onStop(() => Notifications.removeListener('newSegment', newSegment));

    pub._session.sendReady([pub._subscriptionId]);

    console.log(`Initial publication load: ${(new Date) - start} ms`);
  });
});
