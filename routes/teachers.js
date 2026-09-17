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

  response.json(teacher);
});

router.post("/", async (request, response) => {
  const teachers = await loadTeachers();

  const newTeacher = {
    id: Date.now(),
    name: request.body.name,
    subject: request.body.subject
  };

  teachers.push(newTeacher);
  await saveTeachers(teachers);

  response.json(newTeacher);
});

router.put("/:id", async (request, response) => {
  const teachers = await loadTeachers();
  const teacher = teachers.find((teacher) => teacher.id === Number(request.params.id));

  teacher.name = request.body.name;
  teacher.subject = request.body.subject;

  await saveTeachers(teachers);

  response.json(teacher);
});

router.delete("/:id", async (request, response) => {
  const teachers = await loadTeachers();
  const index = teachers.findIndex((teacher) => teacher.id === Number(request.params.id));

  teachers.splice(index, 1);
  await saveTeachers(teachers);

  response.send();
});

export default router;
