# todo
 A simple to-do app. Create an account and login to start tracking your to-do items. In its current form, you will first need to install the npm dependencies, update the database reference in /util/database.js to match your postgresql server and then you can connect to the app by starting the node server in the console with node app.js and visiting localhost:3000. 
    
    Dependencies: 
    "bcryptjs": "^2.4.3" - password hashing
    "body-parser": "^1.18.3" - request body parsing
    "connect-session-sequelize": "^7.1.4",
    "cookie-parser": "^1.4.6" - parses cookies
    "ejs": "^3.1.8" - templating engine
    "express": "^4.18.1" - feature extension for node.js
    "express-session": "^1.17.3" - express package for session management
    "pg": "^8.7.3 - node.js connector for postgresql
    "pg-hstore": "^2.3.4" - node.js connector for postgresql
    "sequelize": "^6.20.1" - feature extender package for simplifying SQL queries