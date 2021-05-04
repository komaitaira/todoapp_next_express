'use scrict';
const express = require('express');
const app = express();


// todoの配列オブジェクトを作成
const todos = [
  { id: 1, title: "ネーム", completed: false },
  { id: 2, title: "下書き", completed: true }
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
app.listen(9999);