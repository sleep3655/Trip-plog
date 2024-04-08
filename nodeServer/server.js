const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const { v4 } = require('uuid');
const axios = require('axios');
const { User, Plog } = require('./model')

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
    const { username, password, avatarUrl } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        console.log('用户名已存在');
        return res.send("Registered");
    }
    const uniqueId = v4();
    // 创建新用户，将唯一ID分配给用户_zqx
    const newUser = new User({ userId: uniqueId, username, password, avatarUrl });
    await newUser.save();
    console.log('用户注册成功！');
    res.send("success");
});



// 登录_zqx
app.post('/toLogin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        console.log('用户登录成功！');
        const userId = user.userId;
        res.status(200).json({ userId });
    } else {
        console.error('用户名或密码不正确。');
        send("false")
        res.status(401);
    }
});

// 获取头像昵称_zqx
app.get('/getUserInfo', async (req, res) => {
    const userId = req.query.userId;
    console.log(userId);
    const result = await User.find({ userId: userId })
    const username = result[0].username;
    const avatarUrl = result[0].avatarUrl;
    console.log(avatarUrl)
    res.send({ username, avatarUrl });
});


// 获取我的发布的数据_zqx
app.get("/getMyPublish", async (req, res) => {
    const userId = req.query.userId;
    const result = await Plog.find({
        userId
    });
    console.log(result)
    res.send(result);
})

// 删除_zqx
app.post("/deletePlog", async (req, res) => {
    const { _id } = req.body
    console.log(_id);
    try {
        await Plog.findByIdAndDelete(_id);
        res.send("success")
    } catch (error) {
        res.send("error")
        console.error(error)
    }
})

// 上传游记_wqj
app.post('/publish', upload.array('file'), async (req, res) => {
    const { userId, title, content, location, cost, date, time } = req.body;
    const files = req.files; // 获取上传的文件
    console.log(userId)
    // 处理文件
    const photoUrls = files.map(file => "http://localhost:3001/file/image/" + file.filename);

    try {
        // 查找是否存在已有的游记对象
        const existingPlog = await Plog.findOne({ userId, title, content, location, cost, date });

        if (existingPlog) {
            // 如果已存在游记对象，则更新 photourl 字段
            existingPlog.photourl = existingPlog.photourl.concat(photoUrls); // 将新的文件名列表合并到已有的 photourl 中
            console.log(photoUrls)
            await existingPlog.save();

            // 返回响应
            res.send('文件上传成功');
        } else {
            // 如果不存在游记对象，则创建新的游记对象
            const newPlog = new Plog({
                userId,
                title,
                content,
                location,
                cost,
                date,
                time,
                photourl: photoUrls,
                status: '待审核' // 设置审核状态为 '待审核'
            });
            await newPlog.save(); // 等待保存操作完成

            // 返回响应
            res.send('文件上传成功');
        }
    } catch (error) {
        // 处理保存过程中出现的错误
        console.error('保存游记到数据库失败', error);
        res.status(500).send('保存游记到数据库失败');
    }
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})