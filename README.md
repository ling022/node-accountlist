一个使用node.js写的账本工具
依赖是node_modules，本不应该上传，但是上传就上传了
# 记账本（Node.js + Express + MongoDB）

一个基于 Node.js、Express 和 MongoDB 的简易记账本应用，支持用户注册登录、账单的增删改查，并提供 Web 页面和 API 两种访问方式。

---

## 功能特性

- 用户注册与登录（密码使用 MD5 加密）
- Session 会话管理（基于 express-session + connect-mongo）
- JWT Token 鉴权（用于 API 接口）
- 账单管理：新增、查询、更新、删除
- 账单按时间倒序排列
- 账单类型区分：支出（-1）/ 收入（1）
- EJS 模板渲染页面
- 提供 Web 页面和 RESTful API 两套接口

---

## 技术栈

| 分类 | 技术 |
|------|------|
| 运行环境 | Node.js |
| Web 框架 | Express |
| 数据库 | MongoDB |
| ODM | Mongoose |
| 模板引擎 | EJS |
| 会话管理 | express-session + connect-mongo |
| 身份认证 | JWT (jsonwebtoken) |
| 密码加密 | MD5 |
| 时间处理 | moment |
| 日志 | morgan |
| 开发工具 | nodemon |

---

## 目录结构
```
test/
├── bin/
│ └── www
├── config/
│ └── config.js
├── middle/
│ ├── checkMiddle.js
│ └── checkMiddleToken.js
├── model/
│ ├── accountModel.js
│ ├── bookModel.js
│ └── userModel.js
├── public/
├── routes/
│ ├── api/
│ │ ├── accounts.js
│ │ └── auth.js
│ └── web/
│ ├── index.js
│ └── auth.js
├── views/
│ ├── auth/
│ │ ├── login.ejs
│ │ └── reg.ejs
│ ├── list.ejs
│ ├── create.ejs
│ ├── success.ejs
│ ├── 404.ejs
│ └── error.ejs
├── app.js
├── package.json
└── README.md
```
text

---

## 环境要求

- Node.js >= 12
- MongoDB >= 4.0
- npm 或 yarn

---

## 安装与运行

### 1. 克隆项目

```bash
git clone https://github.com/ling022/node-accountlist.git
cd node-accountlist
```
### 2. 安装依赖

bash
npm install

### 3. 配置数据库

编辑 config/config.js，修改成你自己的 MongoDB 连接信息：

js
module.exports = {
  dbhost: '127.0.0.1',
  dbport: '27017',
  dbname: 'bilibili',
  secret: 'lingling'
}

### 4. 启动 MongoDB
确保本地 MongoDB 服务已启动。

### 5. 启动项目
bash
npm start
默认监听 http://localhost:3000

页面路由（Web）
方法	路径	说明
GET	/	重定向到 /account
GET	/account	账单列表页（需登录）
GET	/account/create	添加账单页（需登录）
POST	/account	提交新增账单
GET	/account/:id	删除指定账单
GET	/reg	注册页
POST	/reg	提交注册
GET	/login	登录页
POST	/login	提交登录
POST	/logout	退出登录
API 接口
所有 API 都需要在请求头中携带 token：

text
token: <你的 JWT>
1. 登录获取 Token
POST /api/login

请求体：

json
{
  "username": "admin",
  "password": "123456"
}
返回：

json
{
  "code": "0000",
  "msg": "登录成功",
  "data": "eyJhbGciOiJIUzI1NiIs..."
}
2. 获取账单列表
GET /api/account

返回：

json
{
  "code": "0000",
  "msg": "读取成功",
  "data": []
}
3. 获取单条账单
GET /api/account/:id

4. 新增账单
POST /api/account

请求体：

json
{
  "title": "工资",
  "time": "2026-09-17",
  "type": 1,
  "account": 4500,
  "remarks": ""
}

5. 更新账单
PATCH /api/account/id

6. 删除账单
DELETE /api/account/:id

返回码说明
code	含义
0000	操作成功
1001	读取失败
1002	创建失败
1003	删除失败
1004	读取单条失败
1005	更新失败
2001	登录读取失败
2002	用户名或密码错误
2003	token 缺失
2004	token 校验失败
数据模型
account（账单）
js
{
  title: String,
  time: Date,
  type: Number,
  account: Number,
  remarks: String
}
user（用户）
js
{
  username: String,
  password: String
}
```
###安全说明
密码使用 MD5 加密后存储，生产环境建议使用 bcrypt。

config/config.js 中的 secret 是 JWT 签名密钥，请勿泄露到公开仓库。

建议将 config/config.js 加入 .gitignore，或使用环境变量管理敏感信息。

Session Cookie 已开启 httpOnly，前端无法通过 JS 读取。

API 接口需要携带合法 JWT 才能访问。

##待优化项
□ 账单列表支持分页
□ 支持按类型、时间范围筛选
□ 密码加密升级为 bcrypt
□ 增加单元测试
□ 增加 CSRF 防护
□ 使用环境变量管理配置
License
MIT
---

