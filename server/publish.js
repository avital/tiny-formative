Meteor.publish("student", function(fakeUserId) {
  return Segments.find({fakeUserId});
});

activeTeacherPublications = {};

function refetchAllActive() {
  for (pubId in activeTeacherPublications) {
    const pub = activeTeacherPublications[pubId];
    pub.refetch();
  }
};

setInterval(function() {
  Fiber(refetchAllActive).run();
}, 10000);

insertDocInAllActive = function insertDocInAllActive(doc) {
  for (pubId in activeTeacherPublications) {
    const pub = activeTeacherPublications[pubId];
    pub.docInserted(doc);
  }
};

const Fiber = require("fibers");

Meteor.publish("teacher", function() {
  var start = new Date;
  var pub = this;
  var seenIds = {};
  pub.refetch = () => {
    Segments.find().forEach(segment => {
      if (!seenIds[segment._id]) {
        seenIds[segment._id] = true;
        pub._session.socket.send(JSON.stringify({msg: "added", collection: "segments", id: segment._id, fields: segment}));
      }
    });
  };

  pub.docInserted = (segment) => {
    if (!seenIds[segment._id]) {
      seenIds[segment._id] = true;
      pub._session.socket.send(JSON.stringify({msg: "added", collection: "segments", id: segment._id, fields: segment}));
    }
  };
  activeTeacherPublications[pub._subscriptionId] = pub;
  pub.refetch();

  pub._session.sendReady([pub._subscriptionId]);
  console.log((new Date) - start + "ms");
});
