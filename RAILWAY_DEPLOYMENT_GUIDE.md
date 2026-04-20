# Railway 部署详细指南

## 目录
1. [注册Railway账号](#1注册railway账号)
2. [创建新项目](#2创建新项目)
3. [添加PostgreSQL数据库](#3添加postgresql数据库)
4. [获取数据库连接字符串](#4获取数据库连接字符串)
5. [部署后端代码](#5部署后端代码)
6. [配置环境变量](#6配置环境变量)
7. [部署并测试](#7部署并测试)

---

## 1. 注册Railway账号

### 步骤1.1：访问Railway官网
- 打开浏览器，访问：https://railway.app/

### 步骤1.2：注册账号
1. 点击右上角的 **"Login"** 或 **"Sign Up"** 按钮
2. 选择注册方式：
   - **GitHub账号注册**（推荐）：点击 "Continue with GitHub"
   - **邮箱注册**：输入邮箱和密码
3. 按照提示完成注册流程
4. 登录成功后会进入Railway控制台

### 步骤1.3：验证邮箱（如果使用邮箱注册）
- 检查邮箱收到的验证邮件
- 点击验证链接完成邮箱验证

---

## 2. 创建新项目

### 步骤2.1：创建项目
1. 登录Railway后，点击页面左上角的 **"New Project"** 按钮
2. 或者点击 **"+"** 按钮，选择 **"New Project"**

### 步骤2.2：选择项目来源
Railway会提示选择项目来源，选择：
- **"Deploy from GitHub repo"**（从GitHub仓库部署）

### 步骤2.3：连接GitHub仓库
1. 点击 **"Configure GitHub App"** 按钮
2. 授权Railway访问您的GitHub账号
3. 在仓库列表中找到并选择 **"wen0906/lizistyle"** 仓库
4. 点击 **"Import"** 按钮

### 步骤2.4：配置项目
1. **项目名称**：可以自定义，默认使用仓库名 "lizistyle"
2. **根目录**：设置为 `backend`（因为后端代码在backend文件夹中）
3. 点击 **"Deploy"** 按钮开始部署

---

## 3. 添加PostgreSQL数据库

### 步骤3.1：添加数据库服务
1. 在项目页面，点击 **"+ New Service"** 按钮
2. 在服务列表中选择 **"Database"**
3. 选择 **"PostgreSQL"**

### 步骤3.2：配置数据库
1. **数据库名称**：可以自定义，例如 "lizistyle-db"
2. **数据库版本**：选择默认版本（推荐使用最新稳定版）
3. 点击 **"Add"** 按钮

### 步骤3.3：等待数据库创建
- Railway会自动创建PostgreSQL数据库实例
- 通常需要1-2分钟完成初始化
- 等待状态变为 **"Active"**

---

## 4. 获取数据库连接字符串

### 步骤4.1：进入数据库服务
1. 在项目页面，点击刚创建的PostgreSQL数据库服务
2. 进入数据库详情页面

### 步骤4.2：查看连接信息
1. 在数据库详情页面，找到 **"Connection"** 或 **"Variables"** 标签页
2. 找到 **"DATABASE_URL"** 变量
3. 点击变量右侧的复制按钮，复制完整的连接字符串

**连接字符串格式示例：**
```
postgresql://postgres:password@containers-us-west-1.railway.app:5432/railway
```

### 步骤4.3：保存连接字符串
- 将连接字符串保存到记事本或安全的地方
- 后续配置环境变量时需要使用

---

## 5. 部署后端代码

### 步骤5.1：检查后端服务
1. 返回项目主页面
2. 应该看到两个服务：
   - **PostgreSQL数据库**
   - **后端服务**（从GitHub部署）

### 步骤5.2：配置后端服务
1. 点击后端服务进入详情页面
2. 检查 **"Settings"** 标签页
3. 确认以下配置：
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`

### 步骤5.3：修改Dockerfile（如果需要）
如果Railway自动检测的配置不正确，可以手动配置：

**确保backend/Dockerfile存在且内容正确：**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]
```

---

## 6. 配置环境变量

### 步骤6.1：进入环境变量配置
1. 在后端服务详情页面，点击 **"Variables"** 标签页
2. 点击 **"New Variable"** 按钮

### 步骤6.2：添加DATABASE_URL
1. **变量名**：`DATABASE_URL`
2. **变量值**：粘贴之前复制的PostgreSQL连接字符串
3. 点击 **"Save"** 保存

### 步骤6.3：添加JWT_SECRET
1. 再次点击 **"New Variable"** 按钮
2. **变量名**：`JWT_SECRET`
3. **变量值**：输入一个安全的密钥字符串
   - 示例：`your-super-secret-jwt-key-2024`
   - 建议使用随机字符串，至少32个字符
4. 点击 **"Save"** 保存

### 步骤6.4：添加PORT（可选）
1. **变量名**：`PORT`
2. **变量值**：`5000`
3. 点击 **"Save"** 保存

### 步骤6.5：添加NODE_ENV（可选）
1. **变量名**：`NODE_ENV`
2. **变量值**：`production`
3. 点击 **"Save"** 保存

### 步骤6.6：验证环境变量
确保最终的环境变量列表包含：
- ✅ `DATABASE_URL`：PostgreSQL连接字符串
- ✅ `JWT_SECRET`：JWT签名密钥
- ✅ `PORT`：5000
- ✅ `NODE_ENV`：production

---

## 7. 部署并测试

### 步骤7.1：重新部署
1. 在后端服务页面，点击 **"Redeploy"** 按钮
2. 等待部署完成（通常需要2-3分钟）
3. 查看部署日志，确保没有错误

### 步骤7.2：获取后端API地址
1. 部署成功后，在服务页面会看到 **"Domain"** 或 **"URL"**
2. 复制后端API地址
   - 格式示例：`https://lizistyle-backend-production.up.railway.app`

### 步骤7.3：测试API
使用浏览器或Postman测试API：

**测试健康检查：**
```
GET https://lizistyle-backend-production.up.railway.app/
```

**测试获取文章列表：**
```
GET https://lizistyle-backend-production.up.railway.app/api/articles
```

**测试用户注册：**
```
POST https://lizistyle-backend-production.up.railway.app/api/auth/register
Content-Type: application/json

{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "admin123"
}
```

**测试用户登录：**
```
POST https://lizistyle-backend-production.up.railway.app/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### 步骤7.4：更新前端API地址
1. 打开前端项目中的 `src/services/api.js` 文件
2. 修改 `API_BASE_URL` 为Railway后端地址：

```javascript
// 将
const API_BASE_URL = 'http://localhost:5000';

// 改为
const API_BASE_URL = 'https://lizistyle-backend-production.up.railway.app';
```

3. 保存文件后重新部署前端到Vercel或其他平台

---

## 常见问题排查

### 问题1：数据库连接失败
**症状**：日志显示 "ConnectionRefusedError"

**解决方案**：
1. 检查 `DATABASE_URL` 是否正确
2. 确认PostgreSQL服务状态为 "Active"
3. 尝试重新部署后端服务

### 问题2：端口占用错误
**症状**：日志显示 "EADDRINUSE"

**解决方案**：
1. 添加环境变量 `PORT=5000`
2. 确保后端代码使用 `process.env.PORT` 或默认端口

### 问题3：JWT验证失败
**症状**：登录成功但访问受保护接口返回401

**解决方案**：
1. 检查 `JWT_SECRET` 是否设置
2. 确保前后端使用相同的JWT_SECRET
3. 清除浏览器中的旧token

### 问题4：构建失败
**症状**：部署时npm install失败

**解决方案**：
1. 检查 `backend/package.json` 是否正确
2. 确认根目录设置为 `backend`
3. 查看构建日志了解具体错误

---

## 部署检查清单

部署完成后，请确认以下项目：

- [ ] Railway账号已注册并登录
- [ ] 项目已创建并连接GitHub仓库
- [ ] PostgreSQL数据库已添加并处于Active状态
- [ ] 后端代码已成功部署
- [ ] 环境变量已正确配置：
  - [ ] DATABASE_URL
  - [ ] JWT_SECRET
  - [ ] PORT
  - [ ] NODE_ENV
- [ ] 后端API可以正常访问
- [ ] 用户注册和登录功能正常
- [ ] 受保护的API端点需要认证
- [ ] 前端已更新API地址

---

## 下一步

后端部署成功后，您可以：

1. **部署前端到Vercel**
   - 访问 https://vercel.com/
   - 导入GitHub仓库
   - 配置环境变量（如果需要）
   - 部署完成

2. **配置自定义域名**（可选）
   - 在Railway中配置自定义域名
   - 在Vercel中配置自定义域名

3. **监控和日志**
   - 在Railway中查看实时日志
   - 设置监控告警
   - 监控数据库使用情况

---

## 费用说明

Railway提供免费额度：
- **免费试用**：$5/月的免费额度
- **计费方式**：按使用量计费
- **超出免费额度后**：会自动开始计费

建议：
- 开发测试阶段使用免费额度
- 生产环境根据实际使用量选择合适套餐

---

## 技术支持

如果遇到问题：
1. 查看Railway官方文档：https://docs.railway.app/
2. 检查部署日志获取详细错误信息
3. 在GitHub Issues中搜索类似问题

---

**祝您部署顺利！** 🚀
