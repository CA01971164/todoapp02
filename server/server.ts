// Expressアプリのエントリポイントとしてserver/server.jsを作成し、必要なルートやミドルウェアを設定します。Reactアプリのビルドされたファイルを配信するために、Expressアプリ内でclient/buildにアクセスできるようにします。 これらのことをできるようにしておく。

import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import path from "path";

const app = express();
const port = 3001;

app.use(bodyParser.json());

// mysql接続情報
const db = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "todo_database",
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
});

// React ファイル　のビルドされたファイルを配信
app.use(express.static(path.join(__dirname, "client/build")));

// Reactルートへのすべてのリクエストをビルドされたファイルにリダイレクト
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// このExpressアプリは、TODOデータをMySQLデータベースに保存し、Reactアプリからのリクエストに対応するためのエンドポイントを提供します。また、Expressアプリ内でReactアプリのビルドされたファイルにアクセスできるように、express.staticミドルウェアを使用します。以下に、コード全体を示します。
