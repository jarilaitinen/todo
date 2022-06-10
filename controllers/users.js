const { user } = require('pg/lib/defaults');
const Item = require('../models/item');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.postLogin = (req, res, next) => {
        const email = req.body.email;
        const pwd = req.body.pwd;
          User.findOne({ 
            where: {
            email: email
          }})
        .then( user => {
            if (!user) {
            console.log('user not found');
            return res.redirect('/login');
            }
            bcrypt.compare(pwd, user.pwd)
              .then(match => {
                if (match) {
                req.session.isAuthenticated = true;
                req.session.user = user;
                req.session.save((err) => {
                console.log(err);
                res.redirect("/");
                });
                } else {
                console.log('Incorrect password');
                res.redirect("/login");
                };
              })
              .catch((err) => console.log(err)); 
            
            })
          .catch((error) => console.log(error));
      };


exports.getSignUp = (req, res, next) => {
  const isAuthenticated = req.session.isAuthenticated
    if (isAuthenticated === 'true') { 
        res.redirect('/'); 
    } else {
    res.render('create-account', { 
        pageTitle: 'Log in',
    }); 
    }
};

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const pwd = req.body.pwd;
  const passVer = req.body.passver;
  
  if (pwd != passVer) { 
    console.log('Passwords do not match');
    res.redirect('/create-account'); 
  } else {
  User.findOne({ where: { email: email }})
  .then( user => { 
    if (user) {
      console.log('User with this email already exists');
      return res.redirect('/create-account');
    } 
    return bcrypt.hash(pwd, 12)
    })
    .then( hashedPassword => { 
        User.create({
        email: email,
        name: name,
        pwd: hashedPassword
        });
      })
    .then(result => {
        res.redirect('/login');
      })
    .catch(err => console.log(err));  
  }
};

exports.putNewPassword = (req, res, next) => {
    const id = req.session.user.id;
    const oldPwd = req.body.pwd;
    const newPwd = req.body.newpwd;
    const passVer = req.body.passver;
    if (newPwd != passVer) {
        console.log('New passwords did not match');
        res.redirect('/change-pwd');
    }
    console.log(id, oldPwd, newPwd);
    User.findByPk(id)
    .then(user => {
        bcrypt.compare(oldPwd, user.pwd)
        .then(match => {
          if (match) {
            bcrypt
            .hash(newPwd, 12)
            .then(hashedPwd => {
              user.pwd = hashedPwd;
              return user.save();
            })
            .catch(err => console.log(err));            
          } else {
            console.log('Old password was incorrect');
            res.redirect('/change-pwd'); 
          }
        })        
      })
      .then(result => {
        console.log(result);
        res.redirect('/');
    })
    .catch(err => console.log(err));
  };