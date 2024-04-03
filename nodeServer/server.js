const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const { v4 } = require('uuid');
const { User } = require('./model');// 导入数据库模型

port = 3001

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// 配置文件存储
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

//图片上传
const upload = multer({ storage })

app.post("/uploadImg", upload.array("file", 10), (req, res) => {
    res.send(req.files);
})


app.all("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Headers", '*');

    next();
})

app.post('/register', async (req, res) => {
    const { username, password, openid, avatarUrl } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        console.log('用户名已存在');
        return res.sendStatus(401); // 返回状态码 409 表示冲突（用户名已存在）
    }
    // 创建新用户
    const newUser = new User({ username, password, openid, avatarUrl });
    await newUser.save();
    console.log('用户注册成功！');
    res.sendStatus(200);
})



app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        console.log('用户登录成功！');
        res.sendStatus(200);
    } else {
        console.error('用户名或密码不正确。');
        res.sendStatus(401);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})