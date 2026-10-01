import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.resolve(__dirname, "../../data/users.json");

export async function ensureUsersFile() {
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
    await fs.writeFile(USERS_FILE, "[]", "utf8");
  }
}

export async function readUsers() {
  await ensureUsersFile();

  const content = await fs.readFile(USERS_FILE, "utf8");

  if (!content.trim()) {
    return [];
  }

  return JSON.parse(content);
}

export async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}
