var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');
var questionController = require('../controllers/questionController');
var locationController = require('../controllers/locationController');
var gamesController = require('../controllers/gamesController');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Routes index");
  res.render('index.html');
});



//Rutas de usuario
router.get('/admin', adminController.login);

router.route('/admin')
 .post(adminController.comprobar);

router.route('/logout')
  .get(adminController.logout);

 router.route('/editLocation')
  .get(locationController.editLocation);

router.route('/editLocation')
 .post(locationController.saveEditLocation);

router.route('/createLocation')
  .get(locationController.createLocation);
router.route('/createLocation')
  .post(locationController.saveLocation);

router.route('/deleteLocation')
  .get(locationController.deleteLocation);

router.route('/questions')
  .get(questionController.seeQuestions);

router.route('/editQuestion')
  .get(questionController.editQuestion);

router.route('/editQuestion')
 .post(questionController.saveEditQuestion);

router.route('/createQuestion')
  .get(questionController.createQuestion);

router.route('/createQuestion')
 .post(questionController.saveQuestion);

router.route('/deleteQuestion')
  .get(questionController.deleteQuestion);

router.get('/ubicaciones', locationController.ubicaciones);
router.get('/estadisticas', adminController.estadisticas);

//Routes gamesController
router.route('/games')
  .get(gamesController.seeGames);

module.exports = router;
