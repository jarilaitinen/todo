const Item = require('../models/item');

exports.getAddItem = (req, res, next) => {
    res.render('add-item', {
      pageTitle: 'Add New Item'
    });
};

exports.postAddItem = (req, res, next) => {
    const description = req.body.description;
    const itemname = req.body.itemname;
    const item = new Item(itemname, description);
    item.save();
    res.redirect('/');
};

exports.getItems = (req, res, next) => {
  Item.fetchAll(items => {
    res.render('todo', {
        todos: items,
        pageTitle: 'To-do list'
    });
  });
};