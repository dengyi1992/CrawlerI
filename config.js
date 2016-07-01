/**
 * Created by deng on 16-6-7.
 */
/**
 * config
 * case 0:
 options.url = 'http://localhost:3000/huya';
 break;
 case 1:
 options.url = 'http://localhost:3000/douyu';
 break;
 case 2:
 options.url = 'http://localhost:3000/bilibli';
 break;
 case 3:
 options.url = 'http://localhost:3000/panda';
 break;
 case 4:
 options.url = 'http://localhost:3000/yy';
 break;
 *
 */

var path = require('path');

var config = {
    // debug 为 true 时，用于本地调试
    debug: true,

    upload: {
        path: path.join(__dirname, 'public/images/'),
        url: '/public/upload/',
        uploadurl: 'http://120.27.94.166:2999/'
    },

    sitesetting: ['huya', 'douyu', 'bilibli', 'panda', 'yy'],


    db: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'douyu',
        port: 3306
    }
    // db:{
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'xidian@513',
    //     database: 'douyu',
    //     port: 3306
    // }
};


module.exports = config;

