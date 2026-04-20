# Railway 环境变量配置指南

## 问题说明

您遇到的错误是因为Railway在构建阶段需要`DATABASE_URL`环境变量，但此时环境变量还没有配置好。我已经修复了这个问题，现在代码可以在没有`DATABASE_URL`的情况下完成构建。

## 解决方案

### 1. 修复内容

我已经修改了以下文件：

**backend/config/database.js**
- 添加了对`DATABASE_URL`是否存在的检查
- 如果没有`DATABASE_URL`，使用SQLite内存数据库（仅用于构建阶段）
- 将数据库连接测试移到应用启动时执行

**backend/app.js**
- 在服务器启动时才测试数据库连接
- 避免在构建阶段尝试连接数据库

### 2. Railway 配置步骤

#### 步骤2.1：在Railway上创建项目

1. 访问 https://railway.app/
2. 点击 **"New Project"**
3. 选择 **"Deploy from GitHub repo"**
4. 连接您的GitHub账号
5. 选择 `wen0906/lizistyle` 仓库
6. 点击 **"Import"**

#### 步骤2.2：配置项目设置

1. 在项目页面，点击后端服务
2. 进入 **"Settings"** 标签页
3. 设置以下配置：
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`

#### 步骤2.3：添加环境变量

1. 在后端服务页面，点击 **"Variables"** 标签页
2. 点击 **"New Variable"** 按钮
3. 添加以下环境变量：

##### 必需的环境变量

**DATABASE_URL**
- **变量名**: `DATABASE_URL`
- **变量值**: `postgresql://postgres.gudfjfkrpmjznwxywvlx:Linghu0428..@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres`
- **说明**: 您提供的Supabase数据库连接字符串

**JWT_SECRET**
- **变量名**: `JWT_SECRET`
- **变量值**: `your-super-secret-jwt-key-2024-change-this-in-production`
- **说明**: JWT签名密钥，建议使用更安全的随机字符串

##### 可选的环境变量

**PORT**
- **变量名**: `PORT`
- **变量值**: `5000`
- **说明**: 服务器监听端口

**NODE_ENV**
- **变量名**: `NODE_ENV`
- **变量值**: `production`
- **说明**: 运行环境

**FRONTEND_URL**
- **变量名**: `FRONTEND_URL`
- **变量值**: `https://your-frontend-domain.vercel.app`
- **说明**: 前端URL（用于CORS配置）

#### 步骤2.4：部署应用

1. 添加完环境变量后，点击 **"Redeploy"** 按钮
2. 等待部署完成（通常需要2-3分钟）
3. 查看部署日志，确保没有错误

#### 步骤2.5：获取后端API地址

1. 部署成功后，在服务页面会看到 **"Domain"** 或 **"URL"**
2. 复制后端API地址
   - 格式示例：`https://lizistyle-backend-production.up.railway.app`

### 3. 测试API

#### 测试1：健康检查
```bash
curl https://lizistyle-backend-production.up.railway.app/
```

预期响应：
```json
{
  "message": "博客API服务"
}
```

#### 测试2：用户注册
```bash
curl -X POST https://lizistyle-backend-production.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Admin", "email": "admin@example.com", "password": "admin123"}'
```

预期响应：
```json
{
  "id": 1,
  "name": "Admin",
  "email": "admin@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 测试3：用户登录
```bash
curl -X POST https://lizistyle-backend-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "admin123"}'
```

预期响应：
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com"
  }
}
```

#### 测试4：获取文章列表
```bash
curl https://lizistyle-backend-production.up.railway.app/api/articles
```

### 4. 更新前端配置

#### 步骤4.1：修改API地址

打开 `src/services/api.js` 文件，修改 `API_BASE_URL`：

```javascript
// 将
const API_BASE_URL = 'http://localhost:5000';

// 改为您的Railway后端地址
const API_BASE_URL = 'https://lizistyle-backend-production.up.railway.app';
```

#### 步骤4.2：提交并推送更改

```bash
git add .
git commit -m "Update API base URL to Railway backend"
git push origin master
```

### 5. 部署前端到Vercel

#### 步骤5.1：连接Vercel

1. 访问 https://vercel.com/
2. 使用GitHub账号登录
3. 点击 **"Add New Project"**

#### 步骤5.2：导入项目

1. 选择 `wen0906/lizistyle` 仓库
2. 点击 **"Import"**

#### 步骤5.3：配置项目

1. **Framework Preset**: 选择 `Vite`
2. **Root Directory**: 保持默认（根目录）
3. 点击 **"Deploy"**

#### 步骤5.4：获取前端地址

部署成功后，Vercel会提供前端URL，例如：
`https://lizistyle.vercel.app`

### 6. 配置CORS（如果需要）

如果前端和后端域名不同，需要在Railway中配置CORS：

1. 在Railway后端服务的环境变量中添加：
   - **变量名**: `FRONTEND_URL`
   - **变量值**: `https://lizistyle.vercel.app`

2. 重新部署后端服务

### 7. 常见问题

#### 问题1：构建仍然失败

**症状**: 部署日志显示构建错误

**解决方案**:
1. 检查 `backend/package.json` 是否正确
2. 确认根目录设置为 `backend`
3. 查看完整的构建日志

#### 问题2：数据库连接失败

**症状**: 日志显示 "ConnectionRefusedError"

**解决方案**:
1. 检查 `DATABASE_URL` 是否正确
2. 确认Supabase数据库可访问
3. 检查数据库密码是否正确

#### 问题3：CORS错误

**症状**: 浏览器控制台显示跨域错误

**解决方案**:
1. 确保 `FRONTEND_URL` 环境变量已设置
2. 重新部署后端服务
3. 检查浏览器控制台的错误信息

#### 问题4：JWT验证失败

**症状**: 登录成功但访问受保护接口返回401

**解决方案**:
1. 检查 `JWT_SECRET` 是否设置
2. 确保前后端使用相同的JWT_SECRET
3. 清除浏览器中的旧token

### 8. 监控和日志

#### 查看实时日志

1. 在Railway后端服务页面
2. 点击 **"Logs"** 标签页
3. 查看实时日志输出

#### 查看部署历史

1. 点击 **"Deployments"** 标签页
2. 查看所有部署记录
3. 可以回滚到之前的版本

### 9. 费用说明

Railway提供免费额度：
- **免费试用**: $5/月的免费额度
- **计费方式**: 按使用量计费
- **超出免费额度后**: 会自动开始计费

建议：
- 开发测试阶段使用免费额度
- 生产环境根据实际使用量选择合适套餐

### 10. 部署检查清单

部署完成后，请确认以下项目：

- [ ] Railway项目已创建并连接GitHub仓库
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
- [ ] 前端已部署到Vercel
- [ ] 前后端可以正常通信

---

**祝您部署顺利！** 🚀
