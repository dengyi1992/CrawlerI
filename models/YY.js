/**
 * Created by deng on 16-6-7.
 */
var cheerio = require('cheerio');
var request = require('request');
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var schedule = require('node-schedule');
var schedule1 = require('node-schedule');
var timeTask = require("../crawler/YYcrawlerTask.js");
var rule = new schedule.RecurrenceRule();
var rule1 = new schedule1.RecurrenceRule();
var times = [];
var times1 = [];
var isRuning = false;
/**
 * @return {boolean}
 */
exports.YY=function () {
    if (isRuning) {
        return false;
    } else {
        isRuning = true;
        sub();
        return true;

    }
};
myEvents.on('start', function () {
    rule.second = times;
    for (var i = 0; i < 60; i = i + 2) {
        times.push(i);
    }

    schedule.scheduleJob(rule, function () {

        console.log("------------" + new Date());
        if (timeTask.getYULE()) {
            if (timeTask.getMC()) {
                if (timeTask.getLIVE()) {
                    if (timeTask.getSHOW()) {
                        if (timeTask.getDANCE()) {
                            this.cancel();
                            console.log('-------------------------------爬虫结束-------------------------------------');
                            myEvents.emit('updateFans');
                        }
                    }
                }
            }
        }
    });
});
myEvents.on('updateFans',function () {
    rule.second = times;
    for (var i = 0; i < 60; i = i + 2) {
        times.push(i);
    }

    schedule.scheduleJob(rule, function () {
        if(timeTask.getFans()){
            console.log('------------粉丝更新结束---------------')
            this.cancel();
            isRuning=false;
        }

    }); 
});


var mypretime = 0;
function sub() {
    var Today = new Date();
    var NowHour = Today.getHours();
    var NowMinute = Today.getMinutes();
    var NowSecond = Today.getSeconds();
    var mysec = (NowHour * 3600) + (NowMinute * 60) + NowSecond;
    if ((mysec - mypretime) > 10) {
//10只是一个时间值，就是10秒内禁止重复提交，值随便设
        mypretime = mysec;
    } else {
        return;
    }
    myEvents.emit('start');
}