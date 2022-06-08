const Item = require('../models/item');

var currentdate = new Date();
const postTime = currentdate.getDate() + "/"
+ (currentdate.getMonth()+1)  + "/" 
+ currentdate.getFullYear() + " "  
+ currentdate.getHours() + ":"  
+ currentdate.getMinutes() + ":" 
+ currentdate.getSeconds();

exports.getAddItem = (req, res, next) => {
    res.render('edit-item', {
      pageTitle: 'Add New Item',
      editing: false
    });
};

exports.postAddItem = (req, res, next) => {
    const description = req.body.description;
    const itemname = req.body.itemname;
    const item = new Item(null, itemname, description, postTime, null, 'notstarted');
    item
    .save()
    .then(() => { res.redirect('/'); })
    .catch(err => console.log(err));
};

exports.getItems = (req, res, next) => {
  Item.fetchAll()
  .then((result) => {
    //console.log(result.rows);
    res.render('todo', {
      todos: result.rows,
      pageTitle: 'To-do list'
  });
})
  .catch(err => console.log(err));  
};

exports.getFilteredItems = (req, res, next) => {
  filter = req.params.status;
  console.log(filter);
  Item.fetchByStatus(filter)
  .then((result) => {
    //console.log(result.rows);
    res.render('todo', {
      todos: result.rows,
      pageTitle: 'To-do list'
  });
})
  .catch(err => console.log(err));
};


exports.editItem = (req, res, next) => {
    const editMode = req.query.edit;
    const id = req.params.itemid;
    Item.findById(id)
    .then(result => {
      item = result.rows;
      console.log(item);
      res.render('edit-item', {
        todo: item[0],
        pageTitle: 'Edit Item',
        editing: editMode
      });
    })
    .catch(err => console.log(err));
        
  };

exports.postEditItem = (req, res, next) => {
  const id = req.body.itemid;
  const created = req.body.createdon;
  const updatedName = req.body.itemname;
  const updatedDes = req.body.description;
  const updatedStatus = req.body.status;
  console.log(id, created, updatedName, updatedDes);
  const updatedItem = new Item(
    id, 
    updatedName, 
    updatedDes, 
    created, 
    postTime,
    updatedStatus);
  updatedItem
    .save()
    .then(() => { res.redirect('/'); })
    .catch(err => console.log(err));
};

exports.postDeleteItem = (req, res, next) => {
  const id = req.body.itemid;
  Item.deleteById(id);
  res.redirect('/');
};