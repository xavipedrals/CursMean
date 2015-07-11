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
contactRouter.get('/', express_jwt({secret: jwt_secret}), function (req, res) {
    var owner = new ObjectId(req.user._id);
    var agenda = new ObjectId(req.body.agenda);
    Contact.find({"owner": owner, "agenda": agenda}, function(err, contacts){
        if (err) throw err;
        else{
            res.status(200).send(contacts);
        }
    });
});

contactRouter.post('/', express_jwt({secret: jwt_secret}), function(req, res){
    var ownerID = new ObjectId(req.user._id);
    var agenda = req.body.agenda;
    var agendaID = null;
    Agenda.findOrCreate({name: agenda}, function(err, agenda){
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
            new_contact.save(function(err, contact){
                if (err) throw err;
                else{
                    res.status(200).json(contact);
                }
            });
        }
    });
});

module.exports = contactRouter;