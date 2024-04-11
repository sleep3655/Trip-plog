const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const { v4 } = require('uuid');
const axios = require('axios');
const { User, Plog } = require('./model')
const { ObjectId } = mongoose.Types;

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
    // console.log("userId",userId);
    const result = await User.find({ userId: userId })
    const username = result[0].username;
    const avatarUrl = result[0].avatarUrl;
    res.send({ username, avatarUrl });
});


// 获取我的发布的数据_zqx
app.get("/getMyPublish", async (req, res) => {
    const userId = req.query.userId;
    const result = await Plog.find({
        userId
    });

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

app.get('/api/plog', async (req, res) => {
   try {
    const plogs = await Plog.find();
     res.json(plogs);
 } catch (error) {
     console.error('获取游记列表失败', error);
     res.status(500).json({ error: '获取游记列表失败' });
 }
});

//审核通过
app.post('/api/approve', async (req, res) => {
  try {
    const { id } = req.body;
    // 查询对应的记录
    const plog = await Plog.findById(id);
    if (!plog) {
      return res.status(404).json({ message: "记录不存在" });
    }

    // 更新状态为 "已通过"
    plog.status = "已通过";
    await plog.save();

    return res.status(200).json({ message: "通过成功" });
  } catch (error) {
    console.error("通过失败:", error);
    return res.status(500).json({ message: "通过失败" });
  }
});

// 审核未通过
app.post('/api/reject', async (req, res) => {
  const { recordId, reason } = req.body;

  try {
    // 根据 recordId 查找对应的 Plog 数据
    const plog = await Plog.findById(recordId);

    if (!plog) {
      return res.status(404).json({ error: '未找到匹配的记录' });
    }

    // 更新 status 字段
    plog.status = `未通过: ${reason}`;
    await plog.save();

    // 返回成功的响应
    return res.json({ message: '逻辑删除标记成功' });
  } catch (error) {
    console.error('逻辑删除标记失败:', error);
    return res.status(500).json({ error: '逻辑删除标记失败' });
  }
});

// 删除游记（逻辑删除）
app.post('/api/delete', async (req, res) => {
  const { recordId } = req.body;

  try {
    // 根据 recordId 查找对应的 Plog 数据
    const plog = await Plog.findById(recordId);

    if (!plog) {
      return res.status(404).json({ error: '未找到匹配的记录' });
    }

    plog.delete = true;
    await plog.save();

    // 返回成功的响应
    return res.json({ message: '拒绝理由记录成功' });
  } catch (error) {
    console.error('拒绝理由记录失败:', error);
    return res.status(500).json({ error: '拒绝理由记录失败' });
  }
});

// 上传游记_wqj
app.post('/publish', upload.array('file'), async (req, res) => {
    const { id, userId, title, content, location, cost, date, time, fileList } = req.body;
    const photoUrl_original = JSON.parse(fileList.replace(/'/g, "\""))
        .filter(item => item.url.startsWith("http://localhost:3001"))
        .map(item => item.url);
    console.log("photoUrl_original", photoUrl_original);

    const files = req.files; // 获取上传的文件
    let photoUrls_new = []
    // 处理文件
    if (files) {
        photoUrls_new = files.map(file => "http://localhost:3001/file/image/" + file.filename);

    }
    const photoUrls = photoUrl_original.concat(photoUrls_new);
    console.log("photoUrls", photoUrls);
    if (id === '') {
        // 检查数据库中是否存在相同userId和time的数据
        const existingPlog = await Plog.findOne({ userId, time });

        if (existingPlog) {
            // 如果存在相同userId和time的数据，则更新photourl
            existingPlog.photourl.push(...photoUrls);
            await existingPlog.save(); // 等待保存操作完成
        } else {
            // 如果不存在相同userId和time的数据，则创建新的游记对象
            const newPlog = new Plog({
                userId,
                title,
                content,
                location,
                cost,
                date,
                time,
                photourl: photoUrls,
                status: '待审核',
                delete: false
            });
            await newPlog.save(); // 等待保存操作完成
        }
    }
    else {
        // 查找是否存在已有的游记对象
        const existingPlog = await Plog.findById({ _id: id });
        if (existingPlog) {
            await Plog.updateOne(
                { _id: existingPlog._id },
                {
                    $set: {
                        title: title,
                        content: content,
                        location: location,
                        cost: cost,
                        date: date,
                        time: time,
                        photourl: photoUrls,
                        status: '待审核',
                        delete: false
                    }
                }
            );
        }

    }

    // 返回响应
    res.send('文件上传成功');
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})