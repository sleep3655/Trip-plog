# 基于 微信小程序 & 后台管理系统 的旅游日记demo——绿皮书

该项目为华东理工大学与携程旅行网于2024年3月联合开设的的前端训练营的结营大作业。

该项目分为两大部分：

1. 使用微信开发者工具结合Vant-Weapp完成了一个Trip-plog旅游日志小程序，并拥有完整的注册登录、浏览、搜索、分享和发布功能。每个用户可以查看首页他人的游记，并点击plus按钮进入发布页，发布自己的游记，个人中心页会显示已发布的游记。

2. Trip-plog后台管理系统：基于Vite + React框架，配置环境有：Axios、react-router-dom、Vite，组件库：Ant-Design。审核管理系统由审核列表、回收站和游记详情页组成。设置两种用户权限身份登录：审核员和管理员。审核员可以通过点击内容查看游记详情，并返回审核页面，对用户端发布的游记进行“通过”和“拒绝”处理，并附上拒绝理由；管理员在此基础上增加“删除（仅逻辑删除）”权限，删除的游记进入回收站。后端使用nodejs和express搭配mongodb实现，可将数据上传至数据库中保存。

#### 演示

###### 代码链接

https://github.com/sleep3655/Trip-plog

###### 视频演示链接

https://b23.tv/xyylBEm

#### 使用说明

##### 数据库

```js
npm run start
显示：
	Server listening on port 3001
	数据库连接成功
```

##### 小程序

![image](https://github.com/sleep3655/Trip-plog/blob/main/gif/小程序/详情%2B搜索.gif)

##### PC端

```js
npm run dev
运行在：http://localhost:3010/
```

