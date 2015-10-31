var db = require('../db');

db.connect(function(err){
  if(!err) {
      console.log("Database is connected ... \n\n");  
  } else {
      console.log(err);
      console.log("Error connecting database ... \n\n");  
  }
});

var tables = {
  userTable: "users",
  messageTable: "messages",
  roomTable: "rooms"
}

module.exports = {
  messages: {
    get: function (req, res, callback) {
      var query = "SELECT * FROM " + tables.messageTable;
      db.query(query, function(err, results){
        console.log('hello', results);
        console.log(err);
        callback(results);
      }); 
    }, // a function which produces all the messages
    post: function (username, roomname, message) {

      // "SELECT uID, rID from messages m INNER JOIN users u ON m.userID = u.uID INNER JOIN rooms r ON m.roomID = r.rID"
      db.query("INSERT ignore into users (username) values (?)", [username], function(err, results) {
        if(err) {
          console.log('user Error')
        }    
       
          db.query("INSERT ignore into rooms (roomname) values (?)", [roomname], function(err, results) {
            if(err) {
              console.log(' room Error')
            }
        
            var query = "INSERT into messages (userID, roomID, message) values ((SELECT uID from users WHERE username = \'" + username + "\'), (SELECT rID from rooms WHERE roomname = \'" + roomname + "\'), \'" + message + "\')";

            db.query(query, function(err, results) {
              if(err) {
                console.log('...Error', err)
              }
              console.log('posted!')
            })
          })
      }) // a function which can be used to insert a message into the database
  }
},

  users: {
    // Ditto as above.
    
    get: function () {},
    post: function (str) {
      var newUser = str;
      var ourParams = {username : str};
      var query = "INSERT into " + tables.userTable + " SET ?";
      console.log(query);
      db.query(query, ourParams, function(err, results){
        if(err){console.log(err);}
   
      });  
    }
  }
};

