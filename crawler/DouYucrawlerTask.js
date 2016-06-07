var request = require('request');

var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();

var count = 0;
var mysql = require('mysql');
var config = require("../config.js");
//var start =11111;
//var start =18955;
var start = 1;
var page = 0;
var conn = mysql.createConnection(config.db);
exports.UpTags = function () {
    var limit_range = (start - 1) * 10 + ',' + 20;
    var userAddSql = 'SELECT * FROM dy limit ' + limit_range + ';';
    conn.query(userAddSql, function (err, rows, fields) {
        if (err) throw err;
        for (var i = 0; i < rows.length; i++) {
            myEvents.emit('geted', rows[i].room_id);
        }
    });

};
myEvents.on('geted', function (room_id) {
    var optionsfordetail = {
        method: 'GET',
        encoding: null,
        url: "http://www.douyu.com/" + room_id
    };
    request(optionsfordetail, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            try {
                var $ = cheerio.load(body);  //cheerio解析data
                var tags = '';
                var roomname = $('head title').toArray();
                if (roomname["0"].children["0"].data == "提示信息 -斗鱼") {
                    return;
                }
                var zhubotag = $('.live-room .relate-text .r-else-tag dd').toArray();
                var len = zhubotag.length;
                for (var i = 0; i < len; i++) {
                    tags = tags + zhubotag[i].children["1"].attribs.title + ','
                }
                myEvents.emit('updateTags', tags, room_id);
            } catch (e) {
                console.log(e)
            }
        }
    });
});
myEvents.on('updateTags', function (mTags, room_id) {
    var updateSql = 'UPDATE dy SET tags = ? WHERE room_id = ?';
    var updateParams = [mTags, room_id];
    conn.query(updateSql, updateParams, function (err, result) {
        if (err) {
            return console.log(err);
        }
    })
});
exports.getMainData = function () {
    myEvents.emit('initData',page);
};
myEvents.on('initData', function (pn) {
    var douyuApi = {
        method: 'GET',
        encoding: null,
        url: "http://capi.douyucdn.cn/api/v1/live?limit=100&offset=" + parseInt(pn) * 100
    };
    request(douyuApi, function (err, response, body) {
        if (err) {
            return console.log(err);
        }
        acquireData(JSON.parse(body))
    })

});
function acquireData(data) {
    var sql = 'replace INTO dy (room_id, room_name, owner_uid, nickname, online, game_name, fans) VALUES (?,?,?,?,?,?,?)';
    if (data.data.size == 0) {
        return console.log('没有数据了');
    }
    data.data.forEach(function (item) {
        var params = [item.room_id, item.room_name, item.owner_uid, item.nickname, item.online, item.game_name, item.fans];
        conn.query(sql, params, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }


        });

    });
}


