const path = require('path');

const express = require('express');

const itemController = require('../controllers/items');

const router = express.Router();

// /login
router.get('/login', (req, res, next) => {
     res.render('login', { pageTitle: 'Log in'});
});

// /login
router.get('/create-account', (req, res, next) => {
    res.render('create-account', { pageTitle: 'Log in'});
});

// /add-item => GET
router.get('/add-item', itemController.getAddItem);

// /add-item => POST
router.post('/add-item', itemController.postAddItem);

// /edit-item by id
router.get('/edit-item/:itemid', itemController.editItem);

// /edit-item by id
// router.post('delete-item/:itemid');

// list home
router.use('/', itemController.getItems);

module.exports = router;
