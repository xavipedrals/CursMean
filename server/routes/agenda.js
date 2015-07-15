/**
 * Created by xavivaio on 10/07/2015.
 */
var Agenda = require('mongoose').model('Agenda');
var agendaRouter = require('express').Router();
var jwt_secret = require('../config').jwt_secret;
var express_jwt = require('express-jwt');
var ObjectId = require('mongoose').Types.ObjectId;
/**
 * Function to retrieve all the users in the database.
 * Restricted only to admin users.
 */
agendaRouter.get('/', express_jwt({secret: jwt_secret}), function (req, res) {
  console.log('GET AGENDA');
  var owner = new ObjectId(req.user._id);
  Agenda.find({"owner": owner}, function (err, agendes) {
    if (err) throw err;
    else {
      res.status(200).send(agendes);
    }
  });
});

agendaRouter.post('/', express_jwt({secret: jwt_secret}), function (req, res) {
  console.log('CREATE AGENDA');
  var ownerID = new ObjectId(req.user._id);
  var aux = {
    name: req.body.name,
    owner: ownerID
  };
  var new_agenda = new Agenda(aux);
  new_agenda.save(function (err, agenda) {
    if (err) throw err;
    else {
      res.status(200).json(agenda);
    }
  });
});

agendaRouter.put('/', function (req, res) {
  console.log('DELETE AGENDA');
  var name = req.body.name;
  Agenda.findOrCreate({"name": name}, function (err, data) {
    if (err) throw err;
    else {
      //res.status(200).send(data);
      console.log(data._id);
      var agendaID = new ObjectId(data._id);
      Agenda.remove({"_id": agendaID}, function (err) {
        if (err) res.status(500).send("Error al borrar");
        else {
          res.status(200).send("Delete correcte");
        }
      });
    }
  });
});

module.exports = agendaRouter;
