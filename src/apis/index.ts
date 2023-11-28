import { Request, Response } from "express";

const express = require("express");
const mariadb = require("mariadb");

const app = express();
const port = 3100;

const pool = mariadb.createPool({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database",
  connectionLimit: 5,
});

app.get("/todo", async (req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM your_todo_table");
    res.json(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
