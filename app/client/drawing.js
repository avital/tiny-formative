import paper, { Path, PointText, Point, PaperScope, Tool, Segment } from 'paper';

// Returns {tool: ...}
createPaperCanvas = function createPaperCanvas(studentId, drawingCursor) {
  $("body").append(
    $(`<canvas keepalive="true" class="canvas" resize="true" id="canvas-${studentId}" height="400" width="400">`));

  var scope = new PaperScope;
  scope.setup(document.getElementById(`canvas-${studentId}`));
  var tool = new Tool;
  scope.tool = tool;

  var path;

  function updateCanvas(paths) {
    console.log("Got update:", paths);
    delete paths._id;
    for (pathId in paths) {
      var path = paths[pathId];
      var segments = path.map(
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
  }

  if (drawingCursor) {
    drawingCursor.forEach(updateCanvas);
    drawingCursor.observeChanges({
      changed: (id, fields) => updateCanvas(fields)
    });
  }

  return {tool};
}
