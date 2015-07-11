/**
 * Created by xavivaio on 09/07/2015.
 */
var jwt = require('jsonwebtoken');
var User = require('mongoose').model('User');
var secret = require('../config').jwt_secret;
var authRouter = require('express').Router();
/**
 * This function will generate an authentication token to send to the user. The client uses that token to access
 * the protected routes in the API.
 */
authRouter.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email}, function(err, user) {
        if(err) throw err;

        if(!user) {
            res.status(401).send('User not found.');
        } else {
            //Check passwords. Do with hashes in production!
            if (user.password != password) {
                res.status(401).send('Incorrect password.');
            } else {
                var token = jwt.sign(user, secret, {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                //Send token to the spacecraft.
                res.json({
                    token: token
                });
            }
        }
    });
});

module.exports = authRouter;