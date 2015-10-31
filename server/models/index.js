var db = require('../db');

db.dbConnection.connect(function(err){
  if(!err) {
      console.log("Database is connected ... \n\n");  
  } else {
      console.log(err);
      console.log("Error connecting database ... \n\n");  
  }
});

var tables = {
  userTable: "users",
  messageTable: "messages"
}

module.exports = {
  messages: {
    get: function () {
      var query = "SELECT * FROM " + tables.messageTable;
      db.dbConnection.query(query, function(err, results){
        console.log('hello', results);
        console.log(err);
      }); 
    }, // a function which produces all the messages
    post: function (body) {
      var ourParams = {msgID:1,userID:5, roomID:3, message: body.message};
      var query = "INSERT into " + tables.messageTable + " SET ?";
      db.dbConnection.query(query, ourParams, function(err, results){
        console.log(results);
        console.log(err);
      }); 
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    
    get: function () {},
    post: function (str) {
      var newUser = str;
      var ourParams = {username : str};
      var query = "INSERT into " + tables.userTable + " SET ?";
      console.log(query);
      db.dbConnection.query(query, ourParams, function(err, results){
        if(err){console.log(err);}
   
      });  
    }
  }
};

