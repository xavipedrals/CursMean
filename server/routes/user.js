/**
 * Created by xavivaio on 09/07/2015.
 */
var User = require('mongoose').model('User');
var userRouter = require('express').Router();

//userRouter.get('/', express_jwt({secret: jwt_secret}), function (req, res) {
//    var weight = req.user.weight;
//    Spaceports.find({"weight": weight}, function(err, spaceports){
//        if (err) throw err;
//        else{
//            res.status(200).send(spaceports);
//        }
//    });
//});

userRouter.post('/', function(req, res){
    var new_user = new User(req.body);
    new_user.save(function(err, user){
        if (err) throw err;
        else{
            res.status(200).json(user);
        }
    });
});

module.exports = userRouter;