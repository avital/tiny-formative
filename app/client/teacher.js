loadTeacherView = function (sectionId) {
  var start = new Date;
  Meteor.subscribe("teacher", sectionId, () => {
    console.log(`Initial data load: ${((new Date) - start)} ms`);
  });

  var paperCanvasForStudentId = {};

  Drawings.find({}).observe({
    added: function({_id}) {
      var studentId = JSON.parse(_id).studentId;
      if (!paperCanvasForStudentId[studentId]) {
        console.log("new student", studentId);
        paperCanvasForStudentId[studentId] = createPaperCanvas(
          studentId,
          Drawings.find({_id}));
      }
    }
  });
}
