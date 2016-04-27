var start = new Date;

Meteor.methods({
  clear: function() {
    Segments.remove({});
  },
  draw: function(fakeUserId, segments) {
    this.unblock();
    return Segments.insert({fakeUserId, segments});
  }
});
