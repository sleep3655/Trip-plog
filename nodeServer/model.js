const mongoose = require('mongoose');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost/trip')
    .then(() => {
        console.log("数据库连接成功");
    })
    .catch((err) => {
        console.log("数据库连接失败", err);
    })


const UserSchema = new mongoose.Schema({
    openid: {           // 用户ID
        type: String
    },
    username: {         // 用户名
        type: String
    },
    password: {         // 密码
        type: String
    },
    avatarUrl: {             // 用户头像
        type: String
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = { User }