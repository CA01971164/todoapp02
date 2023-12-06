const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");
require("dotenv").config();

const app = express();
const port = 3001;
const dbPassword = process.env.DB_PASSWORD || "defaultPassword";

app.use(bodyParser.json());

// mysql接続情報
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: dbPassword,
  database: "todos",
});

// mysqlの接続
db.connect((err) => {
  if (err) {
    console.error(`MySQL connection error`, err);
  } else {
    console.log(`Connected to MySQL`);
  }
});

// テーブルを作成
db.query(
  `CREATE TABLE IF NOT EXISTS todos (id INT AUTO_INCREMENT PRIMARY KEY,content VARCHAR(255) NOT NULL, done BOOLEAN NOT NULL)`,
  (err) => {
    if (err) {
      console.error(`Error creating table:`, err);
    } else {
      console.log(`Table created`);
    }
  }
);

//TODO一覧取得
app.get("/todos", (req, res) => {
  db.query(`SELECT * FROM todos`, (err, results) => {
    if (err) {
      res.status(500).json({ error: `Error fetching todos` });
    } else {
      res.json(results);
    }
  });
});

//todo追加
app.post("/todos", (req, res) => {
  const { content, done } = req.body;
  db.query(
    `INSERT INTO todos (content,done) Value (?,?)`,
    [content, done],
    (err) => {
      if (err) {
        res.status(500).json({ error: `Error adding todo` });
      } else {
        res.json({ message: `Todo added successfully` });
      }
    }
  );
}); // React ファイル ビルドされたファイルを配信
app.use(express.static(path.join("C:/todoapp02/client2/build")));

// React ルートへのすべてのリクエストをビルドされたファイルにリダイレクト
// ページ遷移にかかわります
app.get("*", (req, res) => {
  res.sendFile(path.join("C:/todoapp02/client2/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
