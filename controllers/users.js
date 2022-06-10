const { user } = require('pg/lib/defaults');
const Item = require('../models/item');
const User = require('../models/user');

exports.postLogin = (req, res, next) => {
        User.findByPk(1)
          .then((user) => {
            req.session.isAuthenticated = true;
            req.session.user = user;
            req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          })
          .catch((error) => console.log(error));
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
    User.findByPk(id).then(user => {
        if (user.pwd === oldPwd) {
            user.pwd = newPwd;
            return user.save();
        } else {
            console.log('Old password was incorrect');
            res.redirect('/change-pwd'); 
        }
    })
    .then(result => {
      console.log(result);
      res.redirect('/');
    })
    .catch(err => console.log(err));
  };