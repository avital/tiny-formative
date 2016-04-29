loadTeacherView = function () {
  var start = new Date;
  Meteor.subscribe("teacher", () => {
    console.log(`Initial data load: ${((new Date) - start)} ms`);
  });

  var paperCanvasForFakeUserIds = {};

  Segments.find({}).observe({
    added: function({u /*userId*/}) {
      if (!paperCanvasForFakeUserIds[u]) {
        paperCanvasForFakeUserIds[u] = createPaperCanvas(
          u,
          Segments.find({u}));
      }
    }
  });
}
