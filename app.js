const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'PqL3h71Opk44li#Q',
    port: 5400,
});

const app = express();

app.set('view engine', 'ejs'); // Compile dynamic templates with EJS
app.set('views', 'views'); // Location for views (this is actually the default and so not strictly needed)

const todoRoutes = require('./routes/todo');

/* pool.query('SELECT * FROM todo', (err, res) => {
    console.log(err, res)
    pool.end()
}); */

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(todoRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
