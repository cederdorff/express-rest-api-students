import express from "express";
import fs from "node:fs/promises";

const router = express.Router();

async function loadStudents() {
  const data = await fs.readFile("./data/students.json", "utf8");
  return JSON.parse(data);
}

async function saveStudents(students) {
  const json = JSON.stringify(students, null, 2);
  await fs.writeFile("./data/students.json", json);
}

router.get("/", async (request, response) => {
  const students = await loadStudents();

  response.json(students);
});

router.get("/:id", async (request, response) => {
  const students = await loadStudents();
  const student = students.find((student) => student.id === Number(request.params.id));

  response.json(student);
});

router.post("/", async (request, response) => {
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

router.put("/:id", async (request, response) => {
  const students = await loadStudents();
  const student = students.find((student) => student.id === Number(request.params.id));

  student.name = request.body.name;
  student.education = request.body.education;

  await saveStudents(students);

  response.json(student);
});

router.delete("/:id", async (request, response) => {
  const students = await loadStudents();
  const index = students.findIndex((student) => student.id === Number(request.params.id));

  students.splice(index, 1);
  await saveStudents(students);

  response.send();
});

export default router;
