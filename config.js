/**
 * Created by deng on 16-6-7.
 *//**
 * config
 */

var path = require('path');

var config = {
    // debug 为 true 时，用于本地调试
    debug: true,

    upload: {
        path: path.join(__dirname, 'public/images/'),
        url: '/public/upload/',
        uploadurl:'http://121.42.136.52:2999/'
    },



   db:{
       host: 'localhost',
       user: 'root',
       password: 'root',
       database: 'douyu',
       port: 3306
   } 

};



module.exports = config;

