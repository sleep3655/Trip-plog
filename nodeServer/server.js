const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const { v4 } = require('uuid');
const axios = require('axios');
const { User } = require('./model');// 导入数据库模型

port = 3001

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// 配置文件存储_zqx
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./file/image")
    },
    filename: (req, file, cb) => {
        let type = file.originalname.replace(/.+\./, ".");
        console.log(type);
        cb(null, `${v4()}${type}`)
    }
})

//图片上传_zqx
const upload = multer({ storage })
app.post("/uploadImg", upload.array("file", 10), (req, res) => {
    res.send(req.files);
})


app.all("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Headers", '*');

    next();
})


// 注册_zqx
app.post('/register', async (req, res) => {
    const { username, password, openid, avatarUrl } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        console.log('用户名已存在');
        return res.status(401); // 返回状态码 401 表示冲突（用户名已存在）
    }
    const uniqueId = v4();

    // 创建新用户，将唯一ID分配给用户_zqx
    const newUser = new User({ id: uniqueId, username, password, openid, avatarUrl });
    await newUser.save();
    console.log('用户注册成功！');
    res.status(200);
});
// 创建新用户
//     const newUser = new User({ username, password, openid, avatarUrl });
//     await newUser.save();
//     console.log('用户注册成功！');
//     res.sendStatus(200);
// })


// 登录_zqx
app.post('/toLogin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        console.log('用户登录成功！');
        // res.status(200);
        const userId = user.id;
        res.status(200).json({ userId });
    } else {
        console.error('用户名或密码不正确。');
        res.status(401);
    }
});

// 获取头像昵称_zqx
app.get('/getUserInfo', async (req, res) => {
    const userId = req.query.userId;
    console.log(userId);
    const result = await User.find({ id: userId })
    const username = result[0].username;
    const avatarUrl = result[0].avatarUrl;
    console.log(avatarUrl)
    res.send({ username, avatarUrl });
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})