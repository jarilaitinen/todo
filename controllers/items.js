const Item = require('../models/item');
const User = require('../models/user');
var session = require('express-session');

exports.getAddItem = (req, res, next) => {
    res.render('edit-item', {
      pageTitle: 'Add New Item',
      editing: false,
      isAuthenticated: req.session.isAuthenticated
    });
};

exports.postAddItem = (req, res, next) => {
    const description = req.body.description;
    const itemname = req.body.itemname;
    Item
    .create({
      itemname: itemname,
      description: description,
      taskstatus: 'notstarted',
      userId: req.session.user.id
    })
    .then((result) => {
      console.log(result); 
      res.redirect('/'); 
    })
    .catch(err => console.log(err));
};

exports.getItems = (req, res, next) => {
  if (req.session.isAuthenticated) {
  Item.findAll({ where: {userId: req.session.user.id }})
  .then(result => {
    res.render('todo', {
      todos: result,
      pageTitle: 'To-do list',
      isAuthenticated: req.session.isAuthenticated
  });
  }).catch(err => console.log(err));
  } else {
    res.render('todo', {
      pageTitle: 'To-do list',
      isAuthenticated: false
    });
  }
};

exports.getFilteredItems = (req, res, next) => {
  filter = req.query.taskstatus;
  if (filter !== 'all') {
  Item.findAll({
    where: {
      userId: req.session.user.id,
      taskstatus: filter
    }
  })
  .then((result) => {
    res.render('todo', {
      todos: result,
      pageTitle: 'To-do list',
      isAuthenticated: req.session.isAuthenticated
  });
})
  .catch(err => console.log(err));
} else Item.findAll({ where: {userId: req.session.user.id }})
  .then(result => {
  res.render('todo', {
    todos: result,
    pageTitle: 'To-do list',
    isAuthenticated: req.session.isAuthenticated
});
}).catch(err => console.log(err));  
};


exports.editItem = (req, res, next) => {
    const editMode = req.query.edit;
    const itemid = req.params.id;
    Item.findByPk(itemid)
    .then(result => {
      console.log(result);
      const item = result[0];
      if (!result) { return res.redirect('/');}
      res.render('edit-item', {
        todo: item,
        pageTitle: 'Edit Item',
        editing: editMode,
        isAuthenticated: req.session.isAuthenticated
      });
    })
    .catch(err => console.log(err));
        
  };

exports.postEditItem = (req, res, next) => {
  const id = req.body.id;
  const updatedName = req.body.itemname;
  const updatedDes = req.body.description;
  const updatedStatus = req.body.status;
  console.log(id, updatedName, updatedDes, updatedStatus);
  Item.findByPk(id).then(item => {
    item.itemname = updatedName;
    item.description = updatedDes;
    item.taskstatus = updatedStatus;
    return item.save();
  })
  .then(result => {
    console.log(result);
    res.redirect('/');
  })
  .catch(err => console.log(err));
};

exports.postDeleteItem = (req, res, next) => {
  const id = req.body.id;
  Item.findByPk(id)
    .then(item => {
      return item.destroy();
    })
    .then(result => {
      console.log('Deleted item');
      res.redirect('/');
    })
    .catch(err => console.log(err));
};