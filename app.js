const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const { Client } = require('pg');
const client = new Client();



const app = express();

app.set('view engine', 'ejs'); // Compile dynamic templates with EJS
app.set('views', 'views'); // Location for views (this is actually the default and so not strictly needed)

const todoRoutes = require('./routes/todo');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(todoRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
