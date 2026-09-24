import fs from "node:fs/promises";

export async function loadTeachers() {
  try {
    const data = await fs.readFile("./data/teachers.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Kunne ikke hente underviseree. data/teachers.json mangler eller er ugyldig.");
  }
}

export async function saveTeachers(teachers) {
  const json = JSON.stringify(teachers, null, 2);
  await fs.writeFile("./data/teachers.json", json);
}
