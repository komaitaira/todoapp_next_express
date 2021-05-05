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


// Todo一覧の取得
app.get('/api/todos', (req, res) => {
  // CORS対応。localhost:3000からのリクエストは許可
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  connection.query(
    'SELECT * FROM todos',
    (err, results) => {
      if (!req.query.completed) {
        console.log(results)
        return res.json(results);
      }
      const completed = req.query.completed === 'true' ? 1 : 0;
      res.json(results.filter(result => result.completed === completed));
    }
  );
});

// 9999番ポートでアクセス可能なサーバーを起動する
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});