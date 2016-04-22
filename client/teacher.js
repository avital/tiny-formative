loadTeacherView = function () {
  Meteor.subscribe("teacher");

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
