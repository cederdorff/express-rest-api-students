import fs from "node:fs/promises";

export async function loadTeachers() {
  const data = await fs.readFile("./data/teachers.json", "utf8");
  return JSON.parse(data);
}

export async function saveTeachers(teachers) {
  const json = JSON.stringify(teachers, null, 2);
  await fs.writeFile("./data/teachers.json", json);
}
