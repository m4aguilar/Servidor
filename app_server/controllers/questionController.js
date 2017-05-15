var mongoose = require('mongoose');
var adminModel = new (require('../models/admin'));
var locacionModel = new (require('../models/location'));
var questionModel = new (require('../models/question'));
var admins = mongoose.model("Admin");
var questions = mongoose.model("Question");
var locations = mongoose.model("Location");

exports.seeQuestions = function(req, res){
  var num = req.query.num;
  var placeLoc, numLoc;
  if(req.session.name){
    locations.find({"numero": num}, function(err, resLoc){
      placeLoc = resLoc[0].lugar;
      numLoc = resLoc[0].numero;
    });

    questions.find({"numLocation.numLoc": num}, function(err, questions){
      if(err){
        throw err;
      }else{
        res.render('questions.html',
        {
          questions: questions,
          place: placeLoc,
          num: numLoc,
          name: req.session.name
        });
      }
    });
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }


};

exports.editQuestion = function(req, res){
  var numL = req.query.numL;
  var numQ = req.query.numQ;
  if(req.session.name){
    questions.find({"numLocation.numLoc": numL, "numLocation.numQuest": numQ},
      function(err, question){
        if(err){
          throw err;
        }else{
          res.render('editQuestion.html', {question: question});
        }
    });
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }

};

exports.saveEditQuestion = function(req, res){
    var numL = req.body.numLoc;
    var numQ = req.body.numQuest;


    if(req.session.name){
      questions.update({"numLocation.numLoc": numL, "numLocation.numQuest": numQ},
        {$set:{
          question: req.body.question,
          answer1: req.body.answer1,
          answer2: req.body.answer2,
          answer3: req.body.answer3,
          answer4: req.body.answer4,
          correctAnswer: req.body.correctAnswer
        }
      }, function(err, resultado){
        if(err){
          throw err;
        }else{
          questions.find({"numLocation.numLoc": numL}, function(err, questions){
            if(err){
              throw err;
            }else{
              res.render('questions.html', {
                questions:questions,
                place: questions[0].place,
                num: questions[0].numLocation.numLoc
              });
            }
          });
        }
      });
    }else{
      res.redirect("/admin");
      res.sendFile("/Migit/Servidor/app_server/views/login.html");
    }

};

exports.createQuestion = function(req, res){
  var lugar;
  var i = 0;
  var numP = 1;

  if(req.session.name){
    locations.find({"numero": req.query.numL}, function(err, location){
      lugar = location[0].lugar;
      //Busqueda del número de pregunta menor
      questions.find({"numLocation.numLoc": req.query.numL}, function(err, questions){
        if(err){
          throw err;
        }else{
          while(questions[i] != null){
            if(questions[i].numLocation.numQuest >= numP){
              numP++;
            }
            i++;
          }
          i=0;
        }
        res.render("createQuestion.html",{
          numL: req.query.numL,
          numQ: numP,
          place: lugar,
          error : ""
        });
      });
    });
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }
};

exports.saveQuestion = function(req, res){

  if(req.session.name){
    questions.find({"numLocation.numQuest": req.body.numQuest,
    "numLocation.numLoc" : req.body.numLoc}, function(err, questionfind){
      if(err) throw err;
      if(questionfind != ""){
        //console.log("QuestionFind:" + questionfind);
        console.log("El número de pregunta está ocupado");
        console.log("numero de localización: " + req.body.numLoc);
        console.log("numero de pregunta: " + req.body.numQuest);
        locations.find({"numero": req.query.numL}, function(err, location){
          lugar = location[0].lugar;
          res.render("createQuestion.html",{
            numL: location[0].numero,
            numQ: "",
            place: lugar,
            error: ""
          });
        });
      }else if(questionfind == false){
        //Si no esta duplicada el numero de la pregunta
        //Se inserta en la bd la nueva pregunta
        questions.create({
          question : req.body.question,
          answer1 : req.body.answer1,
          answer2 : req.body.answer2,
          answer3 : req.body.answer3,
          answer4 : req.body.answer4,
          correctAnswer : req.body.correctAnswer,
          place : req.body.place,
          numLocation: {
            numLoc: req.body.numLoc,
            numQuest: req.body.numQuest
          }
        }, function(err, docu) {
          if(err){
            throw err;
          }else{
            //Renderizar la pagina con las preguntas
            questions.find({"numLocation.numLoc" : req.body.numLoc }, function(err, questions){
              if(err){
                throw err;
              }else{
                res.render('questions.html', {
                  questions:questions,
                  place: questions[0].place,
                  num: questions[0].numLocation.numLoc
                });
              }
            });
          }
        });
      }
    });
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }
};

exports.deleteQuestion = function(req, res){

  var numL = req.query.numL;
  var numQ = req.query.numQ;

  if(req.session.name){
    questions.remove({"numLocation.numLoc": numL,"numLocation.numQuest" : numQ},
    function(err, resultado){
      locations.find({"numero" : numL }, function(err, location){
        if(err){
          throw err;
        }else{
          questions.find({"numLocation.numLoc": numL}, function(err, questions){
            if(err){
              throw err;
            }else{
              res.render('questions.html', {
                questions:questions,
                place: location[0].lugar,
                num: location[0].numero
              });
            }
          });
        }
      });
    });
  }else{
    res.redirect("/admin");
    res.sendFile("/Migit/Servidor/app_server/views/login.html");
  }
};
