//index.js
const express = require ('express');
const mongoose = require ('mongoose');
const PORT = process.env.PORT || 3000;
const DB = process.env.DB || 'mongodb://localhost/blog2021';
const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.render('index');
});
app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});
