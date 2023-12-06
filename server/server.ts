const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");
require("dotenv").config();

const app = express();
const port = 3001;

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

app.use(bodyParser.json());

// mysql接続情報
const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbDatabase,
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
// todo追加
app.post("/todos", (req, res) => {
  console.log(req.body);
  const requestData = req.body;
  const addQuery = `INSERT INTO todos (id, content, done) VALUES (?, ?, ?)`;
  const addValues = [requestData.id, requestData.content, requestData.done];
  db.query(addQuery, addValues, (err) => {
    if (err) {
      res.status(500).json({ error: `Error adding todo` });
    } else {
      res.json({ message: `Todo added successfully` });
    }
  });
  console.log(req.body);
});

app.post("/todos/update/:id", (req, res) => {
  console.log(req.body);

  // クライアントからのデータを受け取る
  const requestData = req.body;

  // MySQLデータベースのクエリを実行してデータを変更
  const updateQuery = `UPDATE todos SET done = ${
    requestData.done === 0 ? 1 : 0
  } WHERE id = ${requestData.id}`;
  const updateValues = [requestData.done, requestData.id];

  db.query(updateQuery, updateValues, (error, results) => {
    if (error) {
      console.error("データベースの更新に失敗しました:", error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("データベースの更新が成功しました:", results);
      res.json(requestData);
    }
  });
});

app.delete("/todos/:id", (req, res) => {
  // 削除するデータIDの取得
  const id = parseInt(req.params.id);
  // 削除するSQL文
  const sql = `DELETE FROM todos WHERE id = ${id}`;

  // SQL文を実行
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("データが削除されました");
    }
  });
});

// React ファイル ビルドされたファイルを配信
app.use(express.static(path.join("C:/todoapp02/client2/build")));

// React ルートへのすべてのリクエストをビルドされたファイルにリダイレクト
// ページ遷移にかかわります
app.get("*", (req, res) => {
  res.sendFile(path.join("C:/todoapp02/client2/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
