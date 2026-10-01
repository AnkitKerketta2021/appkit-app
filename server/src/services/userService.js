import crypto from "node:crypto";
import { readUsers, writeUsers } from "../utils/userFile.js";

export async function findUserByLogin(login) {
  const users = await readUsers();
  const normalizedLogin = login.trim().toLowerCase();

  return users.find(
    (user) =>
      user.email.toLowerCase() === normalizedLogin ||
      user.username.toLowerCase() === normalizedLogin
  );
}

export async function findUserByEmail(email) {
  const users = await readUsers();
  const normalizedEmail = email.trim().toLowerCase();

  return users.find(
    (user) => user.email.toLowerCase() === normalizedEmail
  );
}

export async function findUserByUsername(username) {
  const users = await readUsers();
  const normalizedUsername = username.trim().toLowerCase();

  return users.find(
    (user) => user.username.toLowerCase() === normalizedUsername
  );
}

export async function createUser(userData) {
  const users = await readUsers();

  const newUser = {
    id: crypto.randomUUID(),
    username: userData.username.trim(),
    firstName: userData.firstName.trim(),
    lastName: userData.lastName?.trim() || "",
    gender: userData.gender,
    email: userData.email.trim().toLowerCase(),
    phone: userData.phone.trim(),
    password: userData.password,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  await writeUsers(users);

  return newUser;
}
