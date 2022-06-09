const path = require('path');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const sequelize = require ('./util/database');

var SequelizeStore = require("connect-session-sequelize")(session.Store);

const Item = require('./models/item');
const User = require('./models/user');

const app = express();



app.set('view engine', 'ejs'); // Compile dynamic templates with EJS
app.set('views', 'views'); // Location for views (this is actually the default and so not strictly needed)

const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');
const { truncateSync } = require('fs');

var sessionStore = new SequelizeStore({
    db: sequelize,
  });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    store: sessionStore,
    secret: 'A fluffy Juju cat', 
    resave: false, 
    saveUninitialized: false
}));

/* app.use((req, res, next) => {
    User.findByPk(1)
     .then(user => {
         req.user = user;
         next();
     })
     .catch(err => console.log(err));
}); */

app.use(authRoutes);
app.use(todoRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


Item.belongsTo(User, {constraints: true, onDelete: 'CASCADE' });
User.hasMany(Item);

sequelize
.sync()
.then(result => {
    return User.findByPk(1);
})
.then(user => {
    if (!user) {
        User.create({ name: 'Jari', email: 'jari@sfaaristo.fi', pwd: 'password'})
    }
    return Promise.resolve(user);
})
.then(user => {
    //console.log(user);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});


