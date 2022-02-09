//index.js
const express = require ('express');
const mongoose = require ('mongoose');
const PORT = process.env.PORT || 3000;
const DB = process.env.DB || 'mongodb://localhost/blog2021';
mongoose.connect(DB, { useNewUrlParser: true })
.then(() => console.log('BD conectada'));
const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const Post = require('./models/Post');
app.get('/', (req, res) => {
  Post.find((err, posts) => {
  res.render('index', { posts: posts });
  });
});


app.get('/posts/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
  res.render('post', { post: post });
  });
});
app.get('/new', (req, res) => {
  res.render('new_post');
});

 app.post('/comments', (req, res) => {
  console.log('Recibimos:');
  console.log(req.body);
  const { name, comment, id } = req.body;
  const newComment = {name, comment };
  Post.findById(id, (err, post) => {
    post.comments.push(newComment);
    console.log(post);
    post.save((err, post) => {
      res.redirect('/posts/' + id);
    });
  });
});


app.post('/new', (req, res) => {
  //guardemos un post a la base de datos
  console.log('datos recibidos:');
  console.log(req.body);
  const { title, author, topic, content } = req.body;
const post = new Post ({ title, author, topic, content });
post.save((err, post) => {
  console.log('post creado en la DB:');
  console.log(post);
  res.redirect('/');
 });
});
app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});
