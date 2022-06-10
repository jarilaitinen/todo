const express = require('express');

const cookieParser = require('cookie-parser');

const userController = require('../controllers/users');

const router = express.Router();

const User = require('../models/user');

router.use(cookieParser());

// /login
router.get('/login', (req, res, next) => {
    console.log(req.session.isAuthenticated);
    res.render('login', { 
        pageTitle: 'Log in',
        isAuthenticated: req.session.isAuthenticated
        });
});

// post login
router.post('/api/v1/signin', userController.postLogin);

// post logout
router.post('/api/v1/signout',(req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');  
    });  
});

// /create-account
router.get('/create-account', userController.getSignUp);

// create new user
router.post('/api/v1/signup', userController.postSignUp);

// /change-pwd
router.get('/change-pwd', (req, res, next) => {
    res.render('change-pwd', { 
        pageTitle: 'Change password',
        isAuthenticated: req.session.isAuthenticated
    });
});

// change password
router.post('/api/v1/changePassword', userController.putNewPassword);

module.exports = router;