import { loadTeachers, saveTeachers } from "../data/teachers.js";

export async function getAllTeachers(request, response) {
  const teachers = await loadTeachers();

  response.json(teachers);
}

export async function getTeacherById(request, response) {
  const teachers = await loadTeachers();
  const teacher = teachers.find((teacher) => teacher.id === Number(request.params.id));

  response.json(teacher);
}

export async function createTeacher(request, response) {
  const teachers = await loadTeachers();

  const newTeacher = {
    id: Date.now(),
    name: request.body.name,
    subject: request.body.subject
  };

  teachers.push(newTeacher);
  await saveTeachers(teachers);

  response.json(newTeacher);
}

export async function updateTeacher(request, response) {
  const teachers = await loadTeachers();
  const teacher = teachers.find((teacher) => teacher.id === Number(request.params.id));

  teacher.name = request.body.name;
  teacher.subject = request.body.subject;

  await saveTeachers(teachers);

  response.json(teacher);
}

export async function deleteTeacher(request, response) {
  const teachers = await loadTeachers();
  const index = teachers.findIndex((teacher) => teacher.id === Number(request.params.id));

  teachers.splice(index, 1);
  await saveTeachers(teachers);

  response.send();
}
