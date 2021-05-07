'use scrict';
const express = require('express');
const mysql = require('mysql');
const multer = require('multer'); // multerモジュールを読み込む
const app = express();
const port = 9999;

// Expressでクライアント経由からデータを取得する
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// multerでブラウザから送信されたデータを解釈する
app.use(multer().none());

// mysqlの接続情報
const connection = mysql.createConnection({
  host: 'todoapp_next_express_db',
  user: 'root',
  password: "password",
  database: 'todoapp_next_express'
});

// 接続できていない場合はエラーを表示
connection.connect((err) => {
  if (err) {
    console.log('mysqlの接続に失敗しました。接続情報を確認してください。' + err.stack);
    return;
  }
  console.log('db connecting success');
});


// Todo一覧の取得
app.get('/api/todos', (req, res) => {
  console.log("get request")
  // CORS対応。localhost:3000からのリクエストは許可
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  connection.query(
    'SELECT * FROM todos',
    (err, results) => {
      if (!req.query.completed) {
        return res.json(results);
      }
      const completed = req.query.completed === 'true' ? 1 : 0;
      res.json(results.filter(result => result.completed === completed));
    }
  );
});

// Todoの新規作成
app.post('/api/todos/create', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS');
  // res.setHeader('Access-Control-Allow-Headers', "Content-Type");
  console.log(req)
  console.log(req.body)
  if (!req.body.title) {
    return;
  }
  connection.query(
    'INSERT INTO todos (title, completed) VALUES (?, ?)', // クエリ文
    [ req.body.title, false ], // (?, ?)に入る値。
    (err, results) => {
      if (err) {
        console.log('新規登録に失敗しました。' + err.stack);
      }
      return res.json(results);
    }
  );
})

// 9999番ポートでアクセス可能なサーバーを起動する
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});