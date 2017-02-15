var url = require("url");
var path = require('path');
var express = require('express');
var app = require('./app');
var util = require('util');
var router = express.Router();
var v1 = "v1";
var utile = require('./utile/utility');
var Constant = require('./utile/Constant');

var UserController = require("./controllers/UserController");
var AccessToken = require('./models/AccessToken');


var jwt = require('jwt-simple');


router.post(util.format('/%s/register', v1), UserController.register);
router.post(util.format('/%s/otp_verify', v1), UserController.otpVerification);

router.get(util.format('/%s/user/profile', v1),isAuthenticated, UserController.getProfile);
router.post(util.format('/%s/user/profile', v1),isAuthenticated, UserController.updateProfile);
router.post(util.format('/%s/user/socialMedia', v1),isAuthenticated, UserController.updateSocial);

router.get("/", function(req, res){
    res.redirect('http://versaillesinsecond.wix.com/versailles');
});




function isAuthenticated(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        AccessToken.find({token : token, status : true}, function(err, tokenList){
            if(err){
                console.log(err);
                utile.internalError(res);
            }else{
                if(tokenList.length > 0){
                    var TokenData =  jwt.decode(tokenList[0].token, Constant.token_secret);
                    req.userid = TokenData.userid;
                    next();
                }else{
                    utile.unauthorize(res);
                    
                }
            }
        });
    }else{
        utile.unauthorize(res);
    }

}

function cache(req, res, next){
    console.log("dsd");
    next();
    
}

app.use(router);
