/**
 * Created by xavivaio on 10/07/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

/**
 * Function to define the model of an user.
 * Some redundant info has been added.
 */
module.exports = function() {
    var agendaSchema = new Schema({
        name: String,
        owner: {type: Schema.Types.ObjectId, Ref: "User"}
    }).plugin(findOrCreate);

    mongoose.model('Agenda', agendaSchema, 'agendes');
};