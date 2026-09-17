import express from "express";
import studentsRouter from "./routes/students.js";
import teachersRouter from "./routes/teachers.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/students", studentsRouter);
app.use("/teachers", teachersRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
