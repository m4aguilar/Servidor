var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');

router.get('/', adminController.login);
router.post('/comprobar', adminController.comprobar);

// router.post('/comprobar', function(req, res, next) {
//   console.log("Routes index");
//   console.log(req.body.name);
// });

module.exports = router;
