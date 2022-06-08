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
    constructor(itemid, itemname, description, createdon, modifiedon, status) {
    this.itemid = itemid;
    this.itemname = itemname;
    this.description = description;
    this.userid = 1;
    this.createdon = createdon;
    this.modifiedon = modifiedon;
    this.status = status;
    }

    save() {
        getItemsFromFile(items => {
          if (this.itemid) {
            const existingItemIndex = items.findIndex(item => item.itemid === this.itemid);
            const updatedItems = [...items];
            console.log(this);
            updatedItems[existingItemIndex] = this;
            fs.writeFile(p, JSON.stringify(updatedItems), err => {
              console.log(err);
            });
          } else {
          this.itemid = uuidv1();
          items.push(this);
          fs.writeFile(p, JSON.stringify(items), err => {
            console.log(err);
          });
        }
        });
      }

    static deleteById(id) {
      getItemsFromFile(items => {
        const updatedItemIndex = items.filter(item => item.itemid !== id); 
        fs.writeFile(p, JSON.stringify(updatedItemIndex), err => {
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