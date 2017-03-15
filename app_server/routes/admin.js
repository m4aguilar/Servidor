var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');

router.get('/', adminController.login);

router.get('/admin', adminController.login);

//Rutas de usuario
router.post('/admin/iniciar', adminController.comprobar);

// router.post('/comprobar', function(req, res, next) {
//   console.log("Routes index");
//   console.log(req.body.name);
// });

module.exports = router;
