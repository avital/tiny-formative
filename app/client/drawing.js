import paper, { Path, PointText, Point, PaperScope, Tool, Segment } from 'paper';

// Returns {tool: ...}
createPaperCanvas = function createPaperCanvas(fakeUserId, segmentsCursor, shouldExpectLocalAdd) {
  if (!shouldExpectLocalAdd) {
    shouldExpectLocalAdd = () => false;
  }

  $("body").append(
    $(`<canvas keepalive="true" class="canvas" resize="true" id="canvas-${fakeUserId}" height="400" width="400">`));

  var scope = new PaperScope;
  scope.setup(document.getElementById(`canvas-${fakeUserId}`));
  var tool = new Tool;
  scope.tool = tool;

  var path;

  segmentsCursor.observe({
    added: function(path) {
      // Don't re-draw locally drawn paths
      if (shouldExpectLocalAdd()) {
        return;
      }

      var segments = path.s.map(
        segmentSerialized => {
          var {p, hI, hO} = segmentSerialized;
          p.x = parseFloat(p.x);
          p.y = parseFloat(p.y);
          hI.x = parseFloat(hI.x);
          hI.y = parseFloat(hI.y);
          hO.x = parseFloat(hO.x);
          hO.y = parseFloat(hO.y);
          return new Segment(p, hI, hO);
        });

      new Path({
        project: scope.project,
        segments: segments,
        strokeColor: 'black'
      });
      scope.project.view.draw();
    }
  });

  return {tool};
}
