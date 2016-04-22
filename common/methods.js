var start = new Date;
var data = [];
Meteor.methods({
  draw: function(path) {
//    data.push({
//      time: new Date - start,
//      path: path
//    });
//    console.log(JSON.stringify(data));
    //    console.log();
    return Segments.insert(path);
  }
});
