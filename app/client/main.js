// null if teacher
fakeUserId = window.location.pathname === '/teacher' ? null : Random.id();
isStudent = !!fakeUserId;
isTeacher = !isStudent;

// xcxc
var sectionId = 1;

if (isStudent) {
  loadStudentView(sectionId, fakeUserId);
} else {
  loadTeacherView(sectionId);
}

