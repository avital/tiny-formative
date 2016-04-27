var start = new Date;
var data = [];

var docsToInsert = [];

Meteor.setInterval(function() {
  if (docsToInsert.length === 0)
    return;

  // Copy `docsToInsert` so that while `batchInsert` yields below we
  // don't lose docs
  var docs = docsToInsert;
  docsToInsert = [];

  console.log("Inserting " + docs.length + " docs");
  Segments.batchInsert(docs);
}, 5000);

Meteor.methods({
  clear: function() {
    Segments.remove({});
  },
  draw: function(fakeUserId, segments) {
    this.unblock();
    var id = Random.id();
    var doc = {_id: id, fakeUserId, segments};
    if (Meteor.isServer) {
      docsToInsert.push(doc);
      insertDocInAllActive(doc);
    } else {
      Docs.insert(doc);
    }
    return id;
  }
});
