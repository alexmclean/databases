var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(req, res, function(data) {
        res.send(JSON.stringify(data));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body.username, req.body.roomname, req.body.message);
      res.sendStatus(201);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(req.body.username);

    },
    post: function (req, res) {
      models.users.post(req.body.username);
      res.sendStatus(201);
    }
  }
};

