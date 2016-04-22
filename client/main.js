import paper, { Path, PointText, Point, PaperScope, Tool, Segment } from 'paper';

// Wait until initial DOM is rendered
Meteor.startup(() => {
  var scope = new PaperScope;
  paper.install(scope);
  paper.setup(document.getElementById('canvas-1'));
  var tool = new Tool;

  var path;
  var newSegmentBeingSent = false;

  Segments.find().observe({
    added: function(path) {
      // Don't re-draw locally drawn paths
      if (newSegmentBeingSent) {
        return;
      }

      var segments = path.segments.map(
        segmentSerialized => {
          var {p, hI, hO} = segmentSerialized;
          return new Segment(p, hI, hO);
        });
      new Path({
        segments: segments,
        strokeColor: 'black'
      });
    }
  });

  var textItem = new PointText({
    content: 'Click and drag to draw a line.',
    point: new Point(20, 30),
    fillColor: 'black',
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
    var segmentId = Meteor.call("draw", {segments: segmentsSerialized});
    newSegmentBeingSent = false;
  });
});
