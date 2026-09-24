import express from "express";
import { loadTeachers, saveTeachers } from "../data/teachers.js";

const router = express.Router();

router.get("/", async (request, response) => {
  const teachers = await loadTeachers();

  response.json(teachers);
});

router.get("/:id", async (request, response) => {
  const teachers = await loadTeachers();
  const teacher = teachers.find((teacher) => teacher.id === Number(request.params.id));

  if (!teacher) {
    response.status(404).json({ error: "Ingen undervisere med det id findes." });
    return;
  }

  response.json(teacher);
});

router.post("/", async (request, response) => {
  const teachers = await loadTeachers();

  if (!request.body.name || !request.body.subject) {
    response.status(400).json({ error: "name og subject skal begge udfyldes." });
    return;
  }

  const newTeacher = {
    id: Date.now(),
    name: request.body.name,
    subject: request.body.subject
  };

  teachers.push(newTeacher);
  await saveTeachers(teachers);

  response.status(201).json(newTeacher);
});

router.put("/:id", async (request, response) => {
  const teachers = await loadTeachers();
  const teacher = teachers.find((teacher) => teacher.id === Number(request.params.id));

  if (!teacher) {
    response.status(404).json({ error: "Ingen undervisere med det id findes." });
    return;
  }

  if (!request.body.name || !request.body.subject) {
    response.status(400).json({ error: "name og subject skal begge udfyldes." });
    return;
  }

  teacher.name = request.body.name;
  teacher.subject = request.body.subject;

  await saveTeachers(teachers);

  response.json(teacher);
});

router.delete("/:id", async (request, response) => {
  const teachers = await loadTeachers();
  const teacher = teachers.find((teacher) => teacher.id === Number(request.params.id));

  if (!teacher) {
    response.status(404).json({ error: "Ingen undervisere med det id findes." });
    return;
  }

  const index = teachers.findIndex((teacher) => teacher.id === Number(request.params.id));
  teachers.splice(index, 1);
  await saveTeachers(teachers);

  response.status(204).send();
});

export default router;
