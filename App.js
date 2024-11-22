import express from "express";
import db from './config/db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json())

app.post('/posts', async (req, res) => {
  const {title, content, category = null} = req.body;

  if (!title && !content) {
    return res.status(400).send('please send title and content');
  }

  if (!title) {
    return res.status(400).send('please send title for post');
  }

  if (!content) {
    return res.status(400).send('please send content for post');
  }

  const [result] = await db.execute(
    "INSERT INTO posts (title, content, category) VALUES (?,?,?)",
    [title, content, category]
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
  const [data] = await db.execute("DELETE FROM posts where postID =?", [id]);
  res.send({ sucess: data.affectedRows > 0 });
})


// USERS
app.get('/users', async (req, res) => {
  const [results] = await db.execute('SELECT * from users')
  res.send(results);
})

// CODING
app.get('/coding', async (req, res) => {
  const [results] = await db.execute('SELECT * from users')
  res.send(results);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3MhrRLM_GFBImBDsk2QDJ5PLjIztHvg4",
  authDomain: "portfo-api.firebaseapp.com",
  projectId: "portfo-api",
  storageBucket: "portfo-api.firebasestorage.app",
  messagingSenderId: "827980039273",
  appId: "1:827980039273:web:7b01bb9726ec0263d08ef8",
  measurementId: "G-4QB9M2QHP4"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

getAnalytics(initializeApp(firebaseConfig));