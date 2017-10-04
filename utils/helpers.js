var config = require('../config');
var CustomError = require("../models/common/errors/custom-error");
var dateTimeUtil = require("./date-time-util");
var errorCodes = require("../models/common/errors/error-codes");
var crypto = require('crypto');
let cipher = crypto.createCipher('aes192','LoQue1di4fu3N0seR4');

var helpers = function () {

    var isAdmin = function checkAdmin(req) {
        var token = req.body.token || req.params.token || req.headers['x-access-token'] || req.query.token || req.body.password;
        var adminData = {};
        adminData.isAdmin = false;
        let enc = cipher.update(token, 'utf8', 'hex');
        enc += cipher.final('hex');
        console.log(token);
        console.log(enc);
        console.log(enc === config.ap);
        if (token) {
            adminData.isAdmin = (enc === config.ap);
        }

        return adminData.isAdmin;
    };

    var replaceAll = function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    };
    var getParam = function getParam(req, param) {
        var returnParam = req.body[param] || req.params[param] || req.headers[param] || req.query[param];
        return returnParam;
    };
    var getUrl = function getUrl(req) {
        return req.protocol + '://' + req.get('host') + req.originalUrl;
    };

    return {
        isAdmin: isAdmin,
        replaceAll: replaceAll,
        getParam: getParam,
        getUrl: getUrl
    };
};
module.exports = helpers();
