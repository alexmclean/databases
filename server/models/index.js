var db = require('../db');
var Promise = require('bluebird')

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
    post: function (body) {
      var queryAsync = Promise.promisify(db.query);
      var messageObj = {};

      searchUser(body.username)
        .then(function(user) {
          var data = user;
          if(data.length === 0){
            return queryAsync("INSERT into " + tables[content] + " SET ?", obj, function(err, result) {
              return result.insertId;
            });
          } else {
            return data[0].uID;
          }
        })
        .then(function(uID){
          var data = {
            uID: uID
          };

          searchRoom(body.roomname)
        })


        //   var data = [result]
        //   var content = key === 0 ? body.username : body.roomname;
        //   var paramKey = key === 0 ? 'username' : 'roomname';
        //   var obj = {};
        //   obj[paramKey] = content;

        //   if(result.length === 0) {
        //     return queryAsync("INSERT into " + tables[content] + " SET ?", obj, function(err, result) {
        //         return result.insertId
        //     });
        //   } else {
        //     messageObj[content] = result[0];
        //   }          
        // })
      
      var ourParams = {msgID:1,userID:5, roomID:3, message: body.message};
      var query = "INSERT into " + tables.messageTable + " SET ?";
      db.query(query, ourParams, function(err, results){
        console.log('results', results);
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
      db.query(query, ourParams, function(err, results){
        if(err){console.log(err);}
   
      });  
    }
  }
};

var searchUser = function(username) {
  return new Promise(function(resolve, reject) {
    db.query("SELECT uID from users WHERE username LIKE ?", {username: username}, function(err, results) {
      if(err) {
        reject(err)
      }
      resolve(results);
    });
  });
};

var searchRoom = function(roomname) {
  return new Promise(function(resolve, reject){
    db.query("SELECT rID from rooms WHERE roomname LIKE ?", {roomname: roomname}, function(err, results) {
      if(err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

console.log(searchRoom('lobby'))
