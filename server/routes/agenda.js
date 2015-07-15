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

agendaRouter.put('/', express_jwt({secret: jwt_secret}), function (req, res) {
  console.log('DELETE AGENDA');
  var name = req.body.name;
  var ownerID = new ObjectId(req.user._id);
  Agenda.remove({"name": name, "owner": ownerID}, function (err) {
    if (err) throw err;
    else {
      res.status(200).send("Delete correcte");
    }
  });
});

module.exports = agendaRouter;
