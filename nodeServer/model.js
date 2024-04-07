const mongoose = require('mongoose');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost/trip')
    .then(() => {
        console.log("数据库连接成功");
    })
    .catch((err) => {
        console.log("数据库连接失败", err);
    })

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
    userId: {           // 用户ID
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
const plogSchema = new mongoose.Schema({
    userId: {           // 用户ID
        type: String
    },
    title: {         // 游记标题
        type: String
    },
    content: {         //游记内容
        type: String
    },
    location: {        // 出游地点
        type: String
    },
    cost: {        // 人均花费
        type: Number
    },
    date: {        // 出游时间
        type: String
    },
    time: {        // 发布时间
        type: String
    },
    photourl: {        // 图片地址
        type: [String]
    },
    status: {
        type: String,
        default: '待审核'
    }
}, { collection: 'Plog' });  // 指定集合名称为 'Users'

const Plog = mongoose.model('Plog', plogSchema);

module.exports = { User, Plog };