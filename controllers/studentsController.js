import { loadStudents, saveStudents } from "../data/students.js";

export async function getAllStudents(request, response) {
  let students = await loadStudents();

  if (request.query.education) {
    students = students.filter((student) => student.education === request.query.education);
  }

  if (request.query.sort) {
    const key = request.query.sort;
    students = students.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  }

  if (request.query.page && request.query.limit) {
    const page = Number(request.query.page);
    const limit = Number(request.query.limit);
    const start = (page - 1) * limit;
    students = students.slice(start, start + limit);
  }

  response.json(students);
}

export async function getStudentById(request, response) {
  const students = await loadStudents();
  const student = students.find((student) => student.id === Number(request.params.id));

  response.json(student);
}

export async function createStudent(request, response) {
  const students = await loadStudents();

  const newStudent = {
    id: Date.now(),
    name: request.body.name,
    education: request.body.education
  };

  students.push(newStudent);
  await saveStudents(students);

  response.json(newStudent);
}

export async function updateStudent(request, response) {
  const students = await loadStudents();
  const student = students.find((student) => student.id === Number(request.params.id));

  student.name = request.body.name;
  student.education = request.body.education;

  await saveStudents(students);

  response.json(student);
}

export async function deleteStudent(request, response) {
  const students = await loadStudents();
  const index = students.findIndex((student) => student.id === Number(request.params.id));

  students.splice(index, 1);
  await saveStudents(students);

  response.send();
}
