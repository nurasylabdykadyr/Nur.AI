import { db } from "../db.js";

export const findByUsername = (username) =>
  db.query("SELECT * FROM users WHERE username = $1", [username]);

export const createUser = (username, hashedPassword) =>
  db.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
    [username, hashedPassword],
  );
