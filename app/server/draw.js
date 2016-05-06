import redisEventEmitter from 'redis-eventemitter';
var redisPubsub = redisEventEmitter({host: '192.168.99.100'});

function channelKeyForSection(sectionId) {
  return `segment:${sectionId}:add`;
}

// maps JSON.stringify({sectionId, studentId}) -> {[pathId]: path, ...}
let unflushed = {};

Meteor.setInterval(() => {
  var flushing = unflushed;
  unflushed = {};

  console.log("flush to mongo");
  // TODO: Consider Bulk operations instead of multiple updates
  for (let key in flushing) {
    const {sectionId, studentId} = JSON.parse(key);
    console.log("upsert", {sectionId, studentId}, {$set: flushing[key]});
    Drawings.upsert({sectionId, studentId}, {$set: flushing[key]});
  }
}, 10000);

Meteor.methods({
  draw: function({sectionId, studentId, path}) {
    const pathId = Random.id(4);

    var change = {sectionId, studentId, pathId, path};
    console.log("redis emit", channelKeyForSection(sectionId), change);
    redisPubsub.emit(channelKeyForSection(sectionId), change);

    const unflushedKey = JSON.stringify({sectionId, studentId});
    if (!unflushed[unflushedKey])
      unflushed[unflushedKey] = {}
    unflushed[unflushedKey][pathId] = path;
  }
});

Meteor.publish("teacher", function(sectionId) {
  var start = new Date;
  var pub = this;

  var drawingsSent = {};
  var pathsSent = {};

  // Send a segment down to the client unless it's already been sent
  function sendPath(studentId, pathId, path) {
    console.log("sendPath", studentId, pathId, path);
    const pathKey = JSON.stringify({studentId, pathId});
    if (!pathsSent[pathKey]) {
      pathsSent[pathKey] = true;
      const drawingKey = JSON.stringify({sectionId, studentId});

      if (!drawingsSent[studentId]) {
        drawingsSent[studentId] = true;
        // Use low-level API to avoid keeping query result set in memory
        // and slow stringifyDDP
        var msg = JSON.stringify(
          {msg: "added", collection: "drawings", id: drawingKey, fields: {}})
        console.log("socket send", msg);
        pub._session.socket.send(msg);
      }

      // Use low-level API to avoid keeping query result set in memory
      // and slow stringifyDDP
      var msg = JSON.stringify(
        {msg: "changed", collection: "drawings", id: drawingKey, fields: {[pathId]: path}});
      console.log("socket send", msg);
      pub._session.socket.send(msg);
    }
  }

  var channelKey = channelKeyForSection(sectionId);
  function onNotification(_channel, {studentId, pathId, path}) {
    sendPath(studentId, pathId, path);
  }
  redisPubsub.on(channelKey, onNotification);
  pub.onStop(() => {
    redisPubsub.removeListener(channelKey, onNotification);
  });

  function fetchAndSend() {
    Drawings.find({sectionId}).forEach((drawing) => {
      console.log(drawing);
      const studentId = drawing.studentId;
      delete drawing.studentId;
      delete drawing._id;
      delete drawing.sectionId;
      // All remaining keys are paths
      // TODO: bad pattern?
      // xcxc faster path: send multiple paths at once
      for (var pathId in drawing) {
        sendPath(studentId, pathId, drawing[pathId]);
      }
    });
  }
  fetchAndSend();
  var handle = Meteor.setInterval(fetchAndSend, 10000);
  pub.onStop(() => { clearInterval(handle); });

  console.log(`Initial publication load: ${(new Date) - start} ms`);
});
