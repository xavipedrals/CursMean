/**
 * Created by xavivaio on 09/07/2015.
 */
var models = ['./user', './agenda', './contact'];

/**
 * Function to initialize all the models, based on an Array.
 */
exports.initialize = function() {
    models.forEach(function(model){
        require(model)();
    });
};