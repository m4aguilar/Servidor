var express = require('express');
var router = express.Router();
var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Routes index");
  res.render('index.html');
});

module.exports = router;
