const mongoose = require('mongoose');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost/trip')
    .then(() => {
        console.log("数据库连接成功");
    })
    .catch((err) => {
        console.log("数据库连接失败", err);
    })

//  连接 MongoDB 数据库
// mongoose.connect('mongodb+srv://harumi:harumi1107@trip-plog.ayrpvnj.mongodb.net/trip?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'trip' // 指定数据库为 'trip'
// })
//     .then(() => {
//         console.log("数据库连接成功");
//     })
//     .catch((err) => {
//         console.log("数据库连接失败", err);
//     });
const UserSchema = new mongoose.Schema({
    id: {           // 用户ID
        type: String
    },
    openid: {           // 用户ID
        type: String
    },

    username: {         // 用户名
        type: String
    },
    password: {         // 密码
        type: String
    },
    avatarUrl: { // 用户头像
        type: String
    }
}, { collection: 'Users' }); // 指定集合名称为 'Users'

const User = mongoose.model('User', UserSchema)
module.exports = { User }