import paper, { Path, PointText, Point, PaperScope, Tool, Segment } from 'paper';

loadStudentView = function(fakeUserId) {
  Meteor.subscribe("student", fakeUserId);

  // Wait until initial DOM is rendered
  Meteor.startup(() => {
    var newSegmentBeingSent = false;

    const {tool} = createPaperCanvas(
      fakeUserId, Segments.find({fakeUserId}), () => newSegmentBeingSent);

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

      var segmentsSerialized = path.segments.map(segment => ({
        p: _.pick(segment.point, 'x', 'y'),
        hI: _.pick(segment.handleIn, 'x', 'y'),
        hO: _.pick(segment.handleOut, 'x', 'y')
      }));

      newSegmentBeingSent = true;
      var segmentId = Meteor.call("draw", fakeUserId, segmentsSerialized);
      newSegmentBeingSent = false;
    });
  });
};
