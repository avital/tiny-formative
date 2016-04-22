// null if teacher
fakeUserId = window.location.pathname === '/teacher' ? null : Random.id();
isStudent = !!fakeUserId;
isTeacher = !isStudent;

if (isStudent) {
  loadStudentView(fakeUserId);
} else {
  loadTeacherView();
}

