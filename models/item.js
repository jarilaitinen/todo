const { resolveSoa } = require('dns');
const fs = require('fs');
const path = require('path');

const db = require('../util/database')

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
function getItemsFromDb() {
  return db.query('SELECT * FROM todo');   
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
        if (this.itemid) {
          const editquery = {
            text: 'UPDATE todo SET (itemname, description, modifiedon, status) = ($1, $2, $3, $4) WHERE itemid = $5',
            values: [this.itemname, this.description, this.modifiedon, this.status, this.itemid],
          }
          return db.query(editquery);
        } else {
        this.itemid = uuidv1();
        const newquery = {
          text: 'INSERT INTO todo (itemid, itemname, description, userid, createdon, modifiedon, status) VALUES($1, $2, $3, $4, $5, $6, $7)',
          values: [this.itemid, this.itemname, this.description, this.userid, this.createdon, this.modifiedon, this.status],
          }
          return db.query(newquery); }
        }  
    
    static deleteById(id) {
      return db.query('DELETE FROM todo where itemid = $1',[id]);
    }

    static fetchAll() {
      return db.query('SELECT * FROM todo');  
    }
    
    static fetchByStatus(status) {
      return db.query('SELECT * FROM todo where status = $1',[status]);  
    }
    
    static findById(id) {
      return db.query('SELECT * FROM todo where itemid = $1',[id]);
    }
};