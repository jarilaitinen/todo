const express = require('express');

const cookieParser = require('cookie-parser');

const itemController = require('../controllers/users');

const router = express.Router();

router.use(cookieParser());

// /login
router.get('/login', (req, res, next) => {
    console.log(req.session.isAuthenticated);
    res.render('login', { 
        pageTitle: 'Log in',
        isAuthenticated: req.session.isAuthenticated
        });
});

router.post('/api/v1/signin',(req, res, next) => {
    req.session.isAuthenticated = true;
    res.redirect('/');
});

router.post('/api/v1/signout',(req, res, next) => {
    res.clearCookie('isAuthenticated');
    res.redirect('/');
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

router.put('/api/v1/changePassword', (req, res, next) => {
    // Change user pwd
});

module.exports = router;