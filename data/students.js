import fs from "node:fs/promises";

export async function loadStudents() {
  try {
    const data = await fs.readFile("./data/students.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Kunne ikke hente studerende. data/students.json mangler eller er ugyldig.");
  }
}

export async function saveStudents(students) {
  const json = JSON.stringify(students, null, 2);
  await fs.writeFile("./data/students.json", json);
}
