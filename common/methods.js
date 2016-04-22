var start = new Date;
var data = [];
Meteor.methods({
  clear: function() {
    Segments.remove({});
  },
  draw: function(path) {
    this.unblock();
//    data.push({
//      time: new Date - start,
//      path: path
//    });
//    console.log(JSON.stringify(data));
    //    console.log();
    return Segments.insert(path);
  }
});
