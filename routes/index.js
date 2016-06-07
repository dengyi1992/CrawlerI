var express = require('express');
var Bilibli = require("../models/BliBli.js");
var YY = require("../models/YY.js");
var huya = require("../models/HuYa.js");
var douyu = require("../models/DouYu.js");
var panda = require("../models/Panda.js");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/douyu', function (req, res, next) {
    if (douyu.DouYu()) {
        res.render('index', {title: '斗鱼 start running'});
    } else {
        res.render('index', {title: '斗鱼 already running'});
    }
});
router.get('/Panda', function (req, res, next) {
    if (panda.Panda()) {
        res.render('index', {title: '熊猫 start running'});
    } else {
        res.render('index', {title: '熊猫 already running'});
    }
});
router.get('/bilibli', function (req, res, next) {
    if (Bilibli.Bilibli()) {
        res.render('index', {title: '哔哩哔哩 start running'});
    } else {
        res.render('index', {title: '哔哩哔哩 already running'});
    }
});
router.get('/huya', function (req, res, next) {
    if (huya.HuYa()) {
        res.render('index', {title: '虎牙 start running'});
    } else {
        res.render('index', {title: '虎牙 already running'});
    }
});
router.get('/yy', function (req, res, next) {
    if (YY.YY()) {
        res.render('index', {title: 'YY start running'});
    } else {
        res.render('index', {title: 'YY already running'});
    }
});
module.exports = router;
