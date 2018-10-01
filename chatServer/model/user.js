/**
 * Created by wyw on 2018/9/25.
 */
const db = require('../utils/database');
const baseList = require('./baseList');
const crypto = require('crypto'); // 加密

const md5 = pass => { // 避免多次调用MD5报错
    let md5 = crypto.createHash('md5');
    return md5.update(pass).digest("hex");
};
const getUser = (callback) => { // 测试
    baseList.users.find().then(r => {
        callback(r);
    })
};

const login = (params, callback) => { // 登录
    baseList.users.find({name: params.name}).then(r => {
        if (r.length) {
            let pass = md5(params.pass);
            if (r[0]['pass'] === pass) {
                // 此处直接写Date.now 会报错 需要Date.now()!!!;
                baseList.users.update({name: params.name}, {lastLoginTime: Date.now()}).then(raw => {
                    console.log(raw);
                });
                callback({code: 0, data: {name: r[0].name, photo: r[0].photo}});
            } else {
                callback({code: -1});
            }
        } else {
            callback({code: -1});
        }

    })
};

const upUserInfo = (userName, params, callback) => { //修改个人信息、主题等
    baseList.users.update({name: userName}, params).then(raw => {
        if (raw.nModified > 0) {
            callback({code: 0});
        } else {
            callback({code: -1});
        }
    })
};

const signUp = (params, callback) => { // 注册
    baseList.users.find({name: params.name}).then(r => {
        if (r.length) {
            callback({code: 1});
        } else {
            function createfun(code) { // 写入数据
                let pass = md5(params.pass);
                baseList.users.create({name: params.name, pass: pass, code: code}).then(r => {
                    if (r['_id']) {
                        callback({code: 0, data: code});
                    } else {
                        callback({code: -1});
                    }
                })
            }
            function fineOneAccountBase(createfun) { // 查找code
                let rand = Math.random();
                baseList.accountBase.findOneAndUpdate({type: '1', status: '0', random : { $gte : rand }}, {status: '1'}, (err, doc) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (!doc) {
                            baseList.accountBase.findOneAndUpdate({type: '1', status: '0', random : { $lt : rand }}, {status: '1'}, (err, doc) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (doc) {
                                        createfun(doc.code);
                                    }
                                }
                            });
                        } else {
                            createfun(doc.code);
                        }
                    }
                });
            }
            fineOneAccountBase(createfun);
        }

    })
};

const getUserInfo = (userName, callback) => { // 获取登录用户信息
    baseList.users.find({name: userName}).then(r => {
        if (r.length) {
            callback({code: 0, data: {name: r[0].name, photo: r[0].photo, bubble: r[0].bubble, chatTheme: r[0].chatTheme, projectTheme: r[0].projectTheme, wallpaper: r[0].wallpaper, nickname: r[0].nickname, signature: r[0].signature}});
        } else {
            callback({code: -1});
        }
    })
};

const getUserDetail = (userName, callback) => { // 获取登录用户详细信息
    baseList.users.find({name: userName}).then(r => {
        if (r.length) {
            callback({code: 0, data: { nickname: r[0].nickname, signature: r[0].signature, sex: r[0].sex, phone: r[0].phone, email: r[0].email }});
        } else {
            callback({code: -1});
        }
    })
};

module.exports = {
    getUser,
    login,
    upUserInfo,
    signUp,
    getUserInfo,
    getUserDetail
};