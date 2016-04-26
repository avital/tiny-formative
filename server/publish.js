Meteor.publish("student", function(fakeUserId) {
  return Segments.find({fakeUserId});
});

Meteor.publish("teacher", function() {
  var start = new Date;
  var pub = this;
  var allSegments = Segments.find().fetch();
  allSegments.forEach(segment => {
    pub._session.socket.send(JSON.stringify({msg: "added", collection: "segments", id: segment._id, fields: segment}));
  });
  pub._session.sendReady([this._subscriptionId]);
  console.log((new Date) - start + "ms");
});
