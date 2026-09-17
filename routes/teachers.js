import express from "express";

const router = express.Router();

let teachers = [
  { id: 1, name: "Mette Nielsen", subject: "Webudvikling" },
  { id: 2, name: "Jonas Berg", subject: "Design" }
];

router.get("/", (request, response) => {
  response.json(teachers);
});

router.get("/:id", (request, response) => {
  const teacher = teachers.find((teacher) => teacher.id === Number(request.params.id));

  response.json(teacher);
});

router.post("/", (request, response) => {
  const newTeacher = {
    id: Date.now(),
    name: request.body.name,
    subject: request.body.subject
  };

  teachers.push(newTeacher);

  response.json(newTeacher);
});

router.put("/:id", (request, response) => {
  const teacher = teachers.find((teacher) => teacher.id === Number(request.params.id));

  teacher.name = request.body.name;
  teacher.subject = request.body.subject;

  response.json(teacher);
});

router.delete("/:id", (request, response) => {
  const index = teachers.findIndex((teacher) => teacher.id === Number(request.params.id));

  teachers.splice(index, 1);

  response.send();
});

export default router;
