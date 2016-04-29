var start = new Date;

Meteor.methods({
  clear: function() {
    Notifications.emit("clearSegments");
    Segments.remove({});
  },
  draw: function(fakeUserId, segments) {
    this.unblock();
    var id = Random.id();
    var doc = {_id: id, u: fakeUserId, s: segments};

    if (Meteor.isServer) {
      Notifications.emit("newSegment", doc);
    } else {
      Segments.insert(doc);
    }
    return id;
  }
});
