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
    var contactSchema = new Schema({
        name: String,
        surname: String,
        company: String,
        telephone: Number,
        agenda: {type: Schema.Types.ObjectId, Ref: "Agenda"},
        owner: {type: Schema.Types.ObjectId, Ref: "User"}
    }).plugin(findOrCreate);

    mongoose.model('Contact', contactSchema, 'contacts');
};
