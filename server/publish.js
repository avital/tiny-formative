Meteor.publish("student", function(fakeUserId) {
  return Segments.find({fakeUserId});
});

Meteor.publish("teacher", function() {
  return Segments.find();
});
