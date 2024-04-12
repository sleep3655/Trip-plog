# React + Vite

项目名称: "Trip-plog 后台管理系统",
"private": true,
"version": "1.0.0",

环境依赖:
"react": "^18.2.0",
"react-dom": "^18.2.0",
"vite": "^5.2.8"
"antd": "^5.16.1",
"axios": "^1.6.8",
"eslint": "^8.57.0",
"react-router-dom": "^6.22.3"

目录结构描述
├── dist // vite打包后的文件
├── node_modules
├── src
│ ├── components // 组件
│ │ └── NavBar
│ │ ├── NavBar.jsx //头部导航栏
│ │ └── NavBar.module.css //NavBar 样式
│ ├── pages // 页面
│ │ ├── DeleteList.jsx // 回收站
│ │ ├── Details.jsx // 游记详情页
│ │ ├── Layout.jsx // 全局布局
│ │ ├── LoginPage.jsx // 登录页
│ │ ├── ViewList.jsx // 游记审核列表页
│ │ ├── index.module.css //样式
│ │ └── user.json // 登录用户
├── App.css // 全局样式
├── App.jsx // 全局路由配置
├── main.jsx // 入口文件
├── index.html
├── package.json
├── Readme.md // help 文件
└── vite.config.js

http://localhost:3010 登录
http://localhost:3010/management 后台管理页
http://localhost:3010/management/view 游记审核列表页
http://localhost:3010/management/delete 回收站
http://localhost:3010/management/details/:id(审核页跳转) 游记详情页
