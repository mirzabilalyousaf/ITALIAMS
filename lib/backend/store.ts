import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

async function ensureDataFile(collection: string) {
  await fs.mkdir(dataDir, { recursive: true });
  const filePath = path.join(dataDir, `${collection}.json`);
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]", "utf8");
  }
  return filePath;
}

export async function appendRecord<T extends object>(collection: string, record: T) {
  const filePath = await ensureDataFile(collection);
  const raw = await fs.readFile(filePath, "utf8");
  const existing = JSON.parse(raw) as T[];
  existing.push(record);
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2), "utf8");
}
