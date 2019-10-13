# QQ_Music

#### 目录结构

```
服务端目录 (可以独立出去 方便打包 git 才放一起)

├── service    // 服务器端目录
│ ├── index.js // 服务端运行入口文件
│ └── link.js // qq音乐接口API 文件
│ └── package.json // 项目配置文件
└── *** // 项目其他配置文件

前端目录

├── public    // 项目静态文件目录
│ ├── favicon.png // 图标
│ └── index.html // 入口html文件
├── src // 源码目录
│ ├── api    // 有请求的API接口函数目录 封装的请求方法
| ├── base   // 项目中用到的自定义基础组件 和 插件
│ │ ├── confirm // 弹窗confirm插件
│ │ └── loading // 加载组件
│ │ └── toast // 提示插件
│ │ └── *** 
│ ├── common    // 公用css js font image 文件目录
│ │ ├── css
│ │ └── js
│ │ └── *** 
│ ├── components // 公共自定义组件目录
│ │ ├── m-header // 头部
│ │ │ ├── m-header.js
│ │ │ ├── m-header.styl
│ │ │ └── m-header.vue
│ │ └── *** 
│ ├── routers    // 路由
│ │ ├── link.js  //配置项目所有的路由地址 **配置方式跟views目录结构一致**
│ │ └── router.js  // 路由生成文件 预加载模式 **一般不需要改动**
│ ├── store   // vuex配置目录
│ │ └── ***
│ ├── views    // 页面*.vue文件
│ │ └── ***  
│ ├── App.vue // 页面入口文件
│ ├── main.js // 程序入口文件
└── *** // 项目其他配置文件
```
## 项目说明

- 项目采用 Vue2.0 + Vue-cli3.0 + vuex + axios + stylus 搭建

- 后台服务 NodeJs + express + axios 搭建

- 前端项目默认运行端口 localhost:8080  服务端默认运行 localhost

- 请各自配好服务

- 默认已经了解NodeJS基础

### 项目预览地址 [快捷入口](http://music.wodll.com/)

开发周期和时间比较短。平时时间少所以比较感觉比较精简但是她就像18岁的少女 该有的都有了。可以任意扩展和优化！

## 项目总的安装运行方式 进入对应目录
```
npm install
```

### 前端开发环境运行
```
npm run dev
```

### 前端打包命令
```
npm run build
```

### 后端运行命令 进入后端目录
```
node index.js
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
