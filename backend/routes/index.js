const express = require('express');
const articlesRouter = require('./articles');
const categoriesRouter = require('./categories');
const tagsRouter = require('./tags');
const authRouter = require('./auth');

const router = express.Router();

// 注册路由
router.use('/articles', articlesRouter);
router.use('/categories', categoriesRouter);
router.use('/tags', tagsRouter);
router.use('/auth', authRouter);

// 健康检查
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
