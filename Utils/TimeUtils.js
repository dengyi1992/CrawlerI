/**
 * Created by deng on 16-6-21.
 */
exports.PrintCrruentTime = function () {
    var date = new Date();

    console.log(date.getFullYear() + '年' +
        date.getMonth() + '月' +
        date.getDay() + '号' +
        date.getHours() + '时' +
        date.getMinutes() + '分' +
        date.getSeconds() + '秒'
    )
};