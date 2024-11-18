import express from "express";
import db from './config/db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json())

app.post('/posts', async (req, res) => {
  const {id, title, content, category = null} = req.body;

  if (!id || !title || !content) {
    return res.status(400).send('please send title and content');
  }

  const [result] = await db.execute(
    "INSERT INTO posts (id, title, content, category) VALUES (?,?,?,?)",
    [id, title, content, category]
  );
  res.send({ sucess: result.affectedRows > 0 });
});

app.get('/posts', async (req, res) => {
  const [results] = await db.execute('SELECT * from posts');
  res.send(results);
})

app.patch('/posts/:id', async (req, res) => {
  const {id} = req.params;
  const {title} = req.body;

  if (!title) {
    return res.status(400).send('please send title');
  }

  const [data] =await db.execute("UPDATE posts SET title = ? WHERE id = ?", [
    title,
    id,
  ]);
  res.send({ sucess: data.affectedRows > 0 });
});

app.delete('/posts/:id', async (req, res) => {
  const {id} = req.params;
  const [data] = await db.execute("DELETE FROM posts where id =?", [id]);
  res.send({ sucess: data.affectedRows > 0 });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});