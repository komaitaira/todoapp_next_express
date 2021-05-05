'use scrict';
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 9999;

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

app.get("/", (req, res) => {
  connection.query(
    'SELECT * FROM todos',
    (err, result) => {
      res.send(result);
      console.log(result)
    }
  );
  connection.end();
});

// todoの配列オブジェクトを作成
const todos = [
  { id: 2, title: "ネーム", completed: false },
  { id: 3, title: "下書き", completed: true }
];

// Todo一覧の取得
app.get('/api/todos', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  if (!req.query.completed) {
    return res.json(todos);
  }
  const completed = req.query.completed === 'true';
  res.json(todos.filter(todo => todo.completed === completed));
});



// 9999番ポートでアクセス可能なサーバーを起動する
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});