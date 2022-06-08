const fs = require('fs');
const path = require('path');

const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'items.json'
);

var currentdate = new Date();

/// Temporary: Read list items from JSON file  
const getItemsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };

module.exports = class Item {
    constructor(itemname, description) {
    this.itemid = uuidv1();
    this.itemname = itemname;
    this.description = description;
    this.userid = 'someuser';
    this.createdon = currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear() + " "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds();
    this.modifiedon = null;
    this.status = 'NotStarted';
    }

    save() {
        getItemsFromFile(items => {
          items.push(this);
          fs.writeFile(p, JSON.stringify(items), err => {
            console.log(err);
          });
        });
      }

    static fetchAll(cb) {
        getItemsFromFile(cb);
      }  
    
    static findById(id, cb) {
        getItemsFromFile(items => {
            const item = items.find(p => p.itemid === id); //Return automatically
            cb(item);
        });
    }
};