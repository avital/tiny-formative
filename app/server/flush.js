var unflushedSegments = [];

Notifications.addListener('newSegment', segment => {
  unflushedSegments.push(segment);
});

// Batch write all new segment documents once every 5 seconds, since
// every round trip to Mongo is slow and requires a separate
// serialization phase.
Meteor.setInterval(function() {
  if (unflushedSegments.length === 0)
    return;

  // Copy `unflushedSegments` so that we don't lose segment docs added
  // which `batchInsert` is in progress.
  var segmentsToFlush = unflushedSegments;
  unflushedSegments = [];

  console.log("Inserting " + segmentsToFlush.length + " docs");
  Segments.batchInsert(segmentsToFlush);
}, 5000);

