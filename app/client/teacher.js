loadTeacherView = function () {
  var start = new Date;
  Meteor.subscribe("teacher", () => { console.log((new Date) - start) + "ms"; });

  var paperCanvasForFakeUserIds = {};

  Segments.find({}).observe({
    added: function({fakeUserId}) {
      if (!paperCanvasForFakeUserIds[fakeUserId]) {
        paperCanvasForFakeUserIds[fakeUserId] = createPaperCanvas(
          fakeUserId,
          Segments.find({fakeUserId: fakeUserId}));
      }
    }
  });
}
