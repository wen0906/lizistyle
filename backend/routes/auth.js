const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 登录
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 查找用户
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }
    
    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }
    
    // 生成JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 注册
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // 检查邮箱是否已存在
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: '邮箱已存在' });
    }
    
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 创建用户
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取用户列表
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role', 'createdAt'] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新用户
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    // 更新用户信息
    const updateData = { name, email };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    await user.update(updateData);
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除用户
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    await user.destroy();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 检查认证状态
router.get('/check', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: '未授权' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ user: decoded });
  } catch (error) {
    res.status(401).json({ error: '无效的token' });
  }
});

module.exports = router;
