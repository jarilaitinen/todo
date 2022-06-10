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
router.get('/create-account', (req, res, next) => {
    const isAuthenticated = req.session.isAuthenticated
    if (isAuthenticated === 'true') { 
        res.redirect('/'); 
    } else {
    res.render('create-account', { 
        pageTitle: 'Log in',
    }); 
    }
});

router.post('/api/v1/signup', (req, res, next) => {
    // Sign up user
});

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