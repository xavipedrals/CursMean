/**
 * Created by xavivaio on 09/07/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Function to define the model of an user.
 * Some redundant info has been added.
 */
module.exports = function() {
    var userSchema = new Schema({
        username: String,
        password: String,
        email: String
    });

    mongoose.model('User', userSchema, 'users');
};