Drawings = new Meteor.Collection("drawings");
if (Meteor.isServer) {
  Drawings._ensureIndex({sectionId: 1, studentId: 1});
}
