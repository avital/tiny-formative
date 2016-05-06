import paper, { Path, PointText, Point, PaperScope, Tool, Segment } from 'paper';

loadStudentView = function(sectionId, studentId) {
  // Wait until initial DOM is rendered
  Meteor.startup(() => {
    const {tool} = createPaperCanvas(studentId, null);

    var textItem = new PointText({
      content: 'Click and drag to draw a line.',
      point: new Point(20, 30),
      fillColor: 'black'
    });

    tool.on('mousedown', function(event) {
      // Create a new path and set its stroke color to black:
      path = new Path({
        segments: [event.point],
        strokeColor: 'black'
      });
    });

    // While the user drags the mouse, points are added to the path
    // at the position of the mouse:
    tool.on('mousedrag', function(event) {
      path.add(event.point);
    });

    // When the mouse is released, we simplify the path:
    tool.on('mouseup', function(event) {
      path.simplify(10);

      var pathSerialized = path.segments.map(segment => {
        var serialized = {
          p: _.pick(segment.point, 'x', 'y'),
          hI: _.pick(segment.handleIn, 'x', 'y'),
          hO: _.pick(segment.handleOut, 'x', 'y')
        };

        serialized.p.x = serialized.p.x.toFixed(2);
        serialized.p.y = serialized.p.y.toFixed(2);
        serialized.hI.x = serialized.hI.x.toFixed(2);
        serialized.hI.y = serialized.hI.y.toFixed(2);
        serialized.hO.x = serialized.hO.x.toFixed(2);
        serialized.hO.y = serialized.hO.y.toFixed(2);

        return serialized;
      });

      var segmentId = Meteor.call("draw", {sectionId, studentId, path: pathSerialized});
    });
  });
};
