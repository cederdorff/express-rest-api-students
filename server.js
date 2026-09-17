import express from "express";
import fs from "node:fs/promises";

const app = express();
const port = 3000;

app.use(express.json());

async function loadStudents() {
  const data = await fs.readFile("./data/students.json", "utf8");
  return JSON.parse(data);
}

async function saveStudents(students) {
  const json = JSON.stringify(students, null, 2);
  await fs.writeFile("./data/students.json", json);
}

app.get("/students", async (request, response) => {
  const students = await loadStudents();

  response.json(students);
});

app.get("/students/:id", async (request, response) => {
  const students = await loadStudents();
  const student = students.find((student) => student.id === Number(request.params.id));

  response.json(student);
});

app.post("/students", async (request, response) => {
  const students = await loadStudents();

  const newStudent = {
    id: Date.now(),
    name: request.body.name,
    education: request.body.education
  };

  students.push(newStudent);
  await saveStudents(students);

  response.json(newStudent);
});

app.put("/students/:id", async (request, response) => {
  const students = await loadStudents();
  const student = students.find((student) => student.id === Number(request.params.id));

  student.name = request.body.name;
  student.education = request.body.education;

  await saveStudents(students);

  response.json(student);
});

app.delete("/students/:id", async (request, response) => {
  const students = await loadStudents();
  const index = students.findIndex((student) => student.id === Number(request.params.id));

  students.splice(index, 1);
  await saveStudents(students);

  response.send();
});

let teachers = [
  { id: 1, name: "Mette Nielsen", subject: "Webudvikling" },
  { id: 2, name: "Jonas Berg", subject: "Design" }
];

app.get("/teachers", (request, response) => {
  response.json(teachers);
});

app.get("/teachers/:id", (request, response) => {
  const teacher = teachers.find((teacher) => teacher.id === Number(request.params.id));

  response.json(teacher);
});

app.post("/teachers", (request, response) => {
  const newTeacher = {
    id: Date.now(),
    name: request.body.name,
    subject: request.body.subject
  };

  teachers.push(newTeacher);

  response.json(newTeacher);
});

app.put("/teachers/:id", (request, response) => {
  const teacher = teachers.find((teacher) => teacher.id === Number(request.params.id));

  teacher.name = request.body.name;
  teacher.subject = request.body.subject;

  response.json(teacher);
});

app.delete("/teachers/:id", (request, response) => {
  const index = teachers.findIndex((teacher) => teacher.id === Number(request.params.id));

  teachers.splice(index, 1);

  response.send();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
