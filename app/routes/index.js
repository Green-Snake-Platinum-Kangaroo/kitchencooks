var express = require('express');
var router = express.Router();

//DOM element that renders chat form
var chat = "<div class = 'chat-div'><div class='chat'></div><input type='text' id='nameInput' placeholder='Name'><input type='text' id='messageInput' placeholder='Message'></div>";
/* GET home page. */
router.get('/', function(req, res) {
  console.log('in index.js');
  res.render('index', { title: 'Kitchen', chat: chat, user: req.user });
});

module.exports = router;
