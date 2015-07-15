/**
 * Created by xavivaio on 10/07/2015.
 */
var Contact = require('mongoose').model('Contact');
var Agenda = require('mongoose').model('Agenda');
var contactRouter = require('express').Router();
var jwt_secret = require('../config').jwt_secret;
var express_jwt = require('express-jwt');
var ObjectId = require('mongoose').Types.ObjectId;
/**
 * Function to retrieve all the users in the database.
 * Restricted only to admin users.
 */

contactRouter.get('/:agenda', express_jwt({secret: jwt_secret}), function (req, res) {
  console.log('GET CONTACTE');
  var owner = new ObjectId(req.user._id);
  var agenda = req.params.agenda;
  console.log(agenda);
  console.log(owner);
  //TODO: Hauria de ser un find, pero amb un find sol em troba id agenda = undefined
  Agenda.findOrCreate({"owner": owner, "name": agenda}, function (err, data) {
    if (err) throw err;
    else {
      //res.status(200).send(data);
      console.log(data._id);
      var agendaID = new ObjectId(data._id);
      Contact.find({"owner": owner, "agenda": agendaID}, function (err, contacts) {
        if (err) throw err;
        else {
          res.status(200).send(contacts);
        }
      });
    }
  });
});

contactRouter.post('/', express_jwt({secret: jwt_secret}), function (req, res) {
  console.log('CREATE CONTACTE');
  var ownerID = new ObjectId(req.user._id);
  var agenda = req.body.agenda;
  var agendaID = null;
  Agenda.findOrCreate({name: agenda, owner: ownerID}, function (err, agenda) {
    if (err) {
      console.log(err);
      res.status(500).send("Error FindOrCreate agenda");
    }
    else {
      agendaID = new ObjectId(agenda._id);
      var aux = {
        name: req.body.name,
        surname: req.body.surname,
        company: req.body.company,
        telephone: req.body.telephone,
        agenda: agendaID,
        owner: ownerID
      };
      var new_contact = new Contact(aux);
      new_contact.save(function (err, contact) {
        if (err) throw err;
        else {
          res.status(200).json(contact);
        }
      });
    }
  });
});

//Des de angular no deixa posar body a una petició delete, he hagut de fer servir el put per poder accedir al body
contactRouter.put('/',express_jwt({secret: jwt_secret}), function (req, res) {
  var ownerID = new ObjectId(req.user._id);
  var name = req.body.name;
  var surname = req.body.surname;
  var agenda = req.body.agenda;
  console.log(ownerID);
  console.log(req.body.name);
  console.log(surname);
  console.log(agenda);
  Agenda.findOrCreate({"name": agenda, "owner": ownerID}, function (err, data) {
    if (err) throw err;
    else {
      console.log(data._id);
      var agendaID = new ObjectId(data._id);

      Contact.remove({"name": name, "surname": surname, "agenda": agendaID, "owner": ownerID}, function (err) {
        if (err) res.status(500).send("Error al borrar");
        else {
          res.status(200).send("Delete correcte");
        }
      });
    }
  });
});

module.exports = contactRouter;
