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
router.post('/login', userController.postLogin);

// post logout
router.post('/logout',(req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');  
    });  
});

// /create-account
router.get('/create-account', userController.getSignUp);

// create new user
router.post('/create-account', userController.postSignUp);

// /change-pwd
router.get('/change-pwd', (req, res, next) => {
    res.render('change-pwd', { 
        pageTitle: 'Change password',
        isAuthenticated: req.session.isAuthenticated
    });
});

// change password
router.post('/change-pwd', userController.putNewPassword);

module.exports = router;