import express from "express";
import { loadStudents, saveStudents } from "../data/students.js";

const router = express.Router();

router.get("/", async (request, response) => {
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
});

router.get("/:id", async (request, response) => {
  const students = await loadStudents();
  const student = students.find((student) => student.id === Number(request.params.id));

  if (!student) {
    response.status(404).json({ error: "Ingen studerende med det id findes." });
    return;
  }

  response.json(student);
});

router.post("/", async (request, response) => {
  const students = await loadStudents();

  if (!request.body.name || !request.body.education) {
    response.status(400).json({ error: "name og education skal begge udfyldes." });
    return;
  }

  const newStudent = {
    id: Date.now(),
    name: request.body.name,
    education: request.body.education
  };

  students.push(newStudent);
  await saveStudents(students);

  response.status(201).json(newStudent);
});

router.put("/:id", async (request, response) => {
  const students = await loadStudents();
  const student = students.find((student) => student.id === Number(request.params.id));

  if (!student) {
    response.status(404).json({ error: "Ingen studerende med det id findes." });
    return;
  }

  if (!request.body.name || !request.body.education) {
    response.status(400).json({ error: "name og education skal begge udfyldes." });
    return;
  }

  student.name = request.body.name;
  student.education = request.body.education;

  await saveStudents(students);

  response.json(student);
});

router.delete("/:id", async (request, response) => {
  const students = await loadStudents();
  const student = students.find((student) => student.id === Number(request.params.id));

  if (!student) {
    response.status(404).json({ error: "Ingen studerende med det id findes." });
    return;
  }

  const index = students.findIndex((student) => student.id === Number(request.params.id));
  students.splice(index, 1);
  await saveStudents(students);

  response.status(204).send();
});

export default router;
